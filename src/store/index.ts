import { createStore, applyMiddleware, Action } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from "redux-logger";
import apiConfig, { configItem } from "api/config";
import { createRootReducer, hasReducer } from "./reducers";

// redux persist config
const persistConfig = {
  key: 'root',
  storage,
}

// create RootReducer
const rootReducer = createRootReducer(apiConfig);

// persist RootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create Redux Store
const store = createStore(persistedReducer, applyMiddleware(logger));

// persist Store
export const persistor = persistStore(store);

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
