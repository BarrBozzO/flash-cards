import { useContext } from "react";
import Api, { ApiContext } from "api";

function useApi() {
  const api = useContext(ApiContext);

  if (api === null) {
    throw new Error("Api should be set");
  }

  return api as Api;
}

export default useApi;
