import { Action } from "redux";
import produce, { Draft } from "immer";

type paramsType = {
  initialState: any;
  name: string;
};

type stateType = {
  data: any;
  loading: boolean;
  error: null | string;
};

type actionType = Action & {
  payload?: any;
  error?: string | null;
};

export default function getReducerCreator(params: paramsType) {
  const initialState = {
    data: params.initialState,
    loading: false,
    error: null,
  };
  const name = params.name;

  return produce((draft: Draft<stateType>, action: actionType) => {
    switch (action.type) {
      case `GET_${name}_SUCCESS`:
        draft.data = action.payload;
        draft.error = null;
        draft.loading = false;
        break;
      case `GET_${name}_ERROR`:
        draft.data = initialState.data;
        draft.error = action.error as string;
        draft.loading = false;
        break;
      case `GET_${name}_LOADING`:
        draft.loading = true;
        break;
    }
  }, initialState);
}
