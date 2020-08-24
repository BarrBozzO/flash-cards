import { Reducer, Action } from "redux";
import produce, { Draft } from "immer";
import getReducer from "./getReducer";
import postReducer from "./postReducer";
import { configItem } from "config";

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

const createReducer = (items: configItem[]): Reducer => {
  let handlers: {
    [key: string]: Function;
  } = {};
  const initialState = {
    data: {},
    loading: false,
    error: null,
  };

  items.forEach((item) => {
    const itemInitState = item.initialState;
    const name = item.name;

    if (itemInitState) {
      initialState.data = initialState;
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
      handlers[action.type](draft);
    }
  }, initialState);
};

export default createReducer;
