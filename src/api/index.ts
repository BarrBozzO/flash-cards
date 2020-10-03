import { Dispatch, Store } from "redux";
import { DB } from "db";
import config from "./config";
import Provider from "./provider";
import Context from "./context";
import { getRouteActionCreators } from "store";

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

            if (typeof startReq === "function") {
              this.dispatch(successReq(response.data));
            }

            return { data: response.data };
          })
          .catch((error: any) => {
            console.error(error);
            return { error };
          });
      };
    }
  }
}

export const configureApi = (store: Store) => {
  return new Api(store.dispatch);
};

export const ApiProvider = Provider;

export const ApiContext = Context;
