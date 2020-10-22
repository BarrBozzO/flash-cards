import { useContext } from "react";
import { ApiContext } from "api";

function useApi() {
  const api = useContext(ApiContext);

  if (api === null) {
    throw new Error("Api should be set");
  }

  return api as any;
}

export default useApi;
