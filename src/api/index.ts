import { Dispatch, Store } from "redux";
import { DB } from "db";
import config from "./config";
import Provider from "./provider";
import Context from "./context";
import AuthMixin from './auth';
import { getRouteActionCreators } from "store";


class Api {
  private db: DB = new DB();
  protected dispatch: Dispatch;
  protected getAccessToken: () => string;
  [key: string]: any;

  constructor(store: Store) {
    this.dispatch = store.dispatch;
    this.getAccessToken = () => {
      const state = store.getState();

      const token = state.auth.data && state.auth.data.token && state.auth.data.token.access_token;

      return token || '';
    };

    for (const key in config) {
      const route = config[key];

      // add class method
      this[key] = <T = any>(payload: any) => {
        const [startReq, successReq, failReq] = getRouteActionCreators<T>(
          route
        );

        if (typeof startReq === "function") {
          this.dispatch(startReq());
        }

        const dbReq = this.db[route.method].bind(this.db) as (
          url: string,
          payload: T
        ) => Promise<{ status: number; data: any; logout: boolean; } | { error: any }>;

          this.db.token = this.getAccessToken();

        return dbReq(route.url, payload)
          .then((response) => {
            if ("logout" in response) {
              if (response.logout) {
                this.dispatch({
                  type: 'LOGOUT',
                });
                throw new Error('Authorization failed');
              }
            }

            if ("error" in response) {
              if (typeof failReq === "function") {
                this.dispatch(failReq(response.error.message));
              }

              throw new Error(response.error);
            }

            let { data } = response;

            if (route.transformResponse) {
              data = route.transformResponse(data);
            }

            if (typeof successReq === "function") {
              this.dispatch(successReq(data));
            }

            return { data };
          })
          .catch((error: any) => {
            console.error(error);
            return { error };
          });
      };
    }
  }
}


export const ApiWithAuth = AuthMixin(Api);

export const configureApi = (store: Store) => {
  return new ApiWithAuth(store);
};

export const ApiProvider = Provider;

export const ApiContext = Context;
