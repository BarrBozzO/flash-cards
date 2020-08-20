import axios from "axios";
import { createContext } from "react";
import { v4 } from "uuid";

class DB {
  private protocol: string = "http://";
  private domain: string = "localhost";
  private port: string = "4600";

  private get path() {
    return `${this.protocol}${this.domain}:${this.port}`;
  }

  get(dataName: string) {
    return axios({
      method: "GET",
      url: `${this.path}/${dataName}`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  set<T, R>(dataName: string, payload: T): Promise<R> {
    return axios({
      method: "POST",
      url: `${this.path}/${dataName}`,
      data: {
        ...payload,
        id: v4(),
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const db = new DB();

export default createContext(db);
