import axios, { AxiosPromise } from "axios";
import { v4 } from "uuid";

export class DB {
  [k: string]: any;

  private protocol: string = "http://";
  private domain: string = "localhost";
  private port: string = "4600";

  private get path() {
    return `${this.protocol}${this.domain}:${this.port}`;
  }

  private async handler(
    req: AxiosPromise
  ): Promise<
    | {
        status: number;
        data: any;
      }
    | { error: any }
  > {
    try {
      const response = await req;
      return {
        status: response.status,
        data: response.data,
      };
    } catch (err) {
      console.error(err);
      return {
        error: err,
      };
    }
  }

  get<T>(url: string, queryParams: T) {
    return this.handler(
      axios({
        method: "GET",
        url: `${this.path}/${url}`,
        params: {
          ...queryParams,
        },
      })
    );
  }

  post<T>(url: string, payload: T) {
    return this.handler(
      axios({
        method: "POST",
        url: `${this.path}/${url}`,
        data: {
          ...payload,
          id: v4(),
        },
      })
    );
  }

  delete(url: string, payload: { id: string }) {
    return this.handler(
      axios({
        method: "DELETE",
        url: `${this.path}/${url}/${payload.id}`,
      })
    );
  }

  patch<T>(url: string, payload: T) {
    return this.handler(
      axios({
        method: "PATCH",
        url: `${this.path}/${url}`,
        data: {
          ...payload,
        },
      })
    );
  }

  put<T>(url: string, payload: T) {
    return this.handler(
      axios({
        method: "PUT",
        url: `${this.path}/${url}`,
        data: {
          ...payload,
        },
      })
    );
  }
}
