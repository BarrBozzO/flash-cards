import { createStore, applyMiddleware, ActionCreator, Action } from "redux";
import logger from "redux-logger";
import apiConfig, { configItem } from "api/config";
import { createRootReducer, hasReducer } from "./reducers";

const rootReducer = createRootReducer(apiConfig);

const store = createStore(rootReducer, applyMiddleware(logger));

type routeActionCreators<T> = [
  () => Action,
  (data: T) => Action,
  (erorr: string) => Action
];

const getTypeValue = (...args: [string, string, string]) => {
  return args.map((str) => str.toUpperCase()).join("_");
};

export const getRouteActionCreators = <T>(routeConfig: configItem) => {
  if (hasReducer(routeConfig)) {
    const { name, method } = routeConfig;
    return [
      () => {
        return {
          type: getTypeValue(method, name, "loading"),
        };
      },
      (data) => {
        return {
          type: getTypeValue(method, name, "success"),
          payload: data,
        };
      },
      (error) => {
        return {
          type: getTypeValue(method, name, "error"),
          error: error,
        };
      },
    ] as routeActionCreators<T>;
  }

  return [];
};

export default store;
