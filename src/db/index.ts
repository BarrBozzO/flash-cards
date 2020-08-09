import axios from "axios";
import { createContext } from "react";

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
}

const db = new DB();

export default createContext(db);
