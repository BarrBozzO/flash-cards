import { combineReducers, Reducer } from "redux";
import config, { configItem } from "config";
import createReducer from "./creators";

const generateReducers = () => {
  const collection: { [key: string]: Reducer } = {};
  debugger;
  const groupedConfig = Object.values(config).reduce(
    (configByReducerName: { [key: string]: configItem[] }, item) => {
      const reducerName = item.reducerName || item.name;
      if (!configByReducerName[reducerName]) {
        configByReducerName[reducerName] = [item];
      } else {
        configByReducerName[reducerName].push(item);
      }

      return configByReducerName;
    },
    {}
  );

  Object.keys(groupedConfig).map((reducerName) => {
    const items = groupedConfig[reducerName];

    const reducer = createReducer(items);
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
