import { Reducer, Action } from "redux";
import produce, { Draft } from "immer";
import getReducer from "./getReducer";
import postReducer from "./postReducer";
import { configItemWithReducer } from "api/config";

type stateType = {
  data: any;
  loading: boolean;
  error: null | string;
};

type actionType = Action & {
  payload?: any;
  error?: string | null;
};

const METHOD_TO_REDUCER = {
  post: postReducer,
  get: getReducer,
  // "patch": () => ({}),
  // "delete": () => ({}),
  // "put": () => ({})
};

const createReducer = (items: configItemWithReducer[]): Reducer => {
  let handlers: {
    [key: string]: Function;
  } = {};
  const initialState = {
    data: {},
    loading: false,
    error: null,
  };

  items.forEach((item) => {
    const name = item.name;
    const providedInitialState = item.reducer.initialState;

    if (providedInitialState) {
      initialState.data = providedInitialState;
    }

    // @ts-ignore
    const itemHandlers = METHOD_TO_REDUCER[item.method]({
      name,
      initialState,
    });

    handlers = { ...handlers, ...itemHandlers };
  });

  return produce((draft: Draft<stateType>, action: actionType) => {
    if (typeof handlers[action.type] === "function") {
      handlers[action.type](draft, action);
    }
  }, initialState);
};

export default createReducer;
