import axios, { AxiosPromise } from "axios";
import { v4 } from "uuid";

export class DB {
  [k: string]: any;

  private api = process.env.REACT_APP_API_URL;
  private _token = '';

  private get path() {
    return this.api;
  }

  private async handler(
    req: AxiosPromise
  ): Promise<
    | {
        status: number;
        logout: boolean;
        data: any;
      }
    | { error: any;  }
  > {
    try {
      const response = await req;
      return {
        status: response.status,
        data: response.data,
        logout: response.status === 401
      };
    } catch (err) {
      console.error(err);
      return {
        error: err,
      };
    }
  }

  set token(value: string) {
    this._token = value;
  }

  get<T>(url: string, queryParams: T & { id: string }) {
    return this.handler(
      axios({
        method: "GET",
        url: `${this.path}/${url}${queryParams && queryParams.id ? `/${queryParams.id}` : ""}`,
        params: {
          ...queryParams,
          id: undefined,
        },
        headers: {
          'authorization': `Bearer ${this._token}`
        }
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
        headers: {
          'authorization': `Bearer ${this._token}`
        }
      })
    );
  }

  delete(url: string, payload: { id: string }) {
    return this.handler(
      axios({
        method: "DELETE",
        url: `${this.path}/${url}/${payload.id}`,
        headers: {
          'authorization': `Bearer ${this._token}`
        }
      })
    );
  }

  patch<T>(url: string, payload: T & { id: string }) {
    return this.handler(
      axios({
        method: "PATCH",
        url: `${this.path}/${url}/${payload.id}`,
        data: {
          ...payload,
          id: undefined,
        },
        headers: {
          'authorization': `Bearer ${this._token}`
        }
      })
    );
  }

  put<T>(url: string, payload: T & { id: string }) {
    return this.handler(
      axios({
        method: "PUT",
        url: `${this.path}/${url}/${payload.id}`,
        data: {
          ...payload,
          id: undefined,
        },
        headers: {
          'authorization': `Bearer ${this._token}`
        }
      })
    );
  }
}
