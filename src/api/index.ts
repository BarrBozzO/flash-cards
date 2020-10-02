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
        return this.db[route.method](route.url, payload)
          .then(({ data, error }: { data: T; error: any }) => {
            if (error) {
              if (typeof startReq === "function") {
                this.dispatch(failReq(error));
              }

              throw new Error(error);
            }

            if (typeof startReq === "function") {
              this.dispatch(successReq(data));
            }

            return data;
          })
          .catch((error: any) => {
            console.error(error);
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
