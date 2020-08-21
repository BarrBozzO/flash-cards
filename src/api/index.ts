import DB from "db";
import { configType } from "./config";

export class Api {
  [key: string]: () => Promise<any>;

  constructor(config: configType) {
    this.run = () => {
      return new Promise((res) => {
        res("success");
      });
    };
  }
}
