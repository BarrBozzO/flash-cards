import { createContext } from "react";
import cfg from "api/config";
import API from "api";

const api = new API(cfg);
const apiContext = createContext(api);

export default apiContext;
