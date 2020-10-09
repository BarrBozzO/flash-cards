import { Dispatch, Store } from "redux";
import GoTrue from 'gotrue-js';
import { DB } from "db";
import config from "./config";
import Provider from "./provider";
import Context from "./context";
import { getRouteActionCreators } from "store";

const auth = new GoTrue({
  APIUrl: process.env.REACT_APP_IDENTITY_URL,
  audience: '',
  setCookie: false,
});

export default class Api {
  private db: DB = new DB();
  private dispatch: Dispatch;
  [key: string]: any;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;

    for (const key in config) {
      const route = config[key];

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
        ) => Promise<{ status: number; data: any } | { error: any }>;

        return dbReq(route.url, payload)
          .then((response) => {
            if ("error" in response) {
              if (typeof startReq === "function") {
                this.dispatch(failReq(response.error));
              }

              throw new Error(response.error);
            }

            let { data } = response;

            if (route.transformResponse) {
              data = route.transformResponse(data);
            }

            if (typeof startReq === "function") {
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

  signup(email: string, password: string) {
    return auth.signup(email, password).then((response) => {
      return {
        email: response.email,
        success: true
      }
    }).catch((error) => {
      console.error(error);
      return {
        error
      };
    });
  }

  signin(email: string, password: string) {
    return auth.login(email, password).then((response) => {
      return {
        email: response.email,
        success: true
      }
    }).catch((error) => {
      console.error(error);
      return {
        error
      };
    });
  }
}

export const configureApi = (store: Store) => {
  return new Api(store.dispatch);
};

export const ApiProvider = Provider;

export const ApiContext = Context;
