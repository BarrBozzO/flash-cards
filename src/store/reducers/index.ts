import { combineReducers, Reducer } from "redux";
import { configItem, configItemWithReducer, configType } from "api/config";
import createReducer from "./creators";

export const hasReducer = (item: configItem): item is configItemWithReducer => {
  return item.hasOwnProperty("reducer");
};

export const generateReducers = (config: configType) => {
  const collection: { [key: string]: Reducer } = {};

  const groupedConfig = Object.values(config)
    .filter(hasReducer)
    .reduce(
      (
        configByReducerName: { [key: string]: configItemWithReducer[] },
        item
      ) => {
        const reducerName = item.reducer.name as string;

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

export const createRootReducer = (config: configType): Reducer => {
  const generatedReducers = generateReducers(config);

  return combineReducers({
    ...generatedReducers,
  });
};

// export type RootState = ReturnType<typeof rootReducer>;
