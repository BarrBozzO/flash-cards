import { combineReducers, Reducer } from "redux";
import config from "config";
import setsReducer from "./sets";
import termsReducer from "./terms";
import { getReducer as getReducerCreator } from "./creators";

const generateReducers = () => {
  const collection: { [key: string]: Reducer } = {};

  Object.values(config).map((item) => {
    const reducerName = item.reducerName || item.name;
    const method = item.method;
    const initialState = item.initialState || {};

    const reducer = getReducerCreator({ name: reducerName, initialState });

    collection[reducerName] = reducer;
  });

  return collection;
};

const generatedReducers = generateReducers();

const rootReducer: Reducer = combineReducers({
  ...generatedReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
