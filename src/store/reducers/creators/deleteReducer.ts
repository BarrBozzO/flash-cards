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

type dataItemType = {
  id: string;
};

export default function (params: paramsType) {
  const name = params.name.toUpperCase();
  return {
    [`DELETE_${name}_SUCCESS`]: (
      draft: Draft<stateType>,
      action: actionType
    ) => {
      const deleteId = action.payload.id;
      const deleteIndex = draft.data.findIndex(
        (item: dataItemType) => item.id === deleteId
      );

      if (deleteIndex) {
        draft.data.splice(deleteIndex, 1);
      }

      draft.error = null;
      draft.loading = false;
      return draft;
    },
    [`DELETE_${name}_LOADING`]: (draft: Draft<stateType>) => {
      draft.loading = true;
      return draft;
    },
    [`DELETE_${name}_ERROR`]: (draft: Draft<stateType>, action: actionType) => {
      draft.data = params.initialState.data;
      draft.error = action.error as string;
      draft.loading = false;
      return draft;
    },
  };
}
