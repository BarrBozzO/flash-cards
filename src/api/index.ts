import { DB } from "db";
import { configType } from "./config";

type customMethod = (payload: any) => Promise<any>;

class Api {
  private db: DB = new DB();
  [key: string]: any;

  constructor(config: configType) {
    for (const key in config) {
      const item = config[key];

      this[key] = <T = any>(payload: any) => {
        // const dbReq = this.db[item.method];

        return this.db[item.method](item.url, payload)
          .then(({ data, error }: { data: T; error: any }) => {
            if (error) {
              throw new Error(error);
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

export default Api;
