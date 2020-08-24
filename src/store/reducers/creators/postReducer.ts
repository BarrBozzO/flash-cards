import { Action } from "redux";
import { Draft } from "immer";

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

export default function (params: paramsType) {
  return {
    [`POST_${name}_SUCCESS`]: (draft: Draft<stateType>, action: actionType) => {
      draft.data.push(action.payload);
      draft.error = null;
      draft.loading = false;
      return draft;
    },
    [`POST_${name}_LOADING`]: (draft: Draft<stateType>) => {
      draft.loading = true;
      return draft;
    },
    [`POST_${name}_ERROR`]: (draft: Draft<stateType>, action: actionType) => {
      draft.data = params.initialState.data;
      draft.error = action.error as string;
      draft.loading = false;
      return draft;
    },
  };
}
