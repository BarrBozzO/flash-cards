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
    [`PATCH_${name}_SUCCESS`]: (
      draft: Draft<stateType>,
      action: actionType
    ) => {
      const patchId = action.payload.id;
      const patchIndex = draft.data.findIndex(
        (item: dataItemType) => item.id === patchId
      );

      if (patchIndex) {
        draft.data[patchIndex] = {
          ...action.payload,
        };
      }

      draft.error = null;
      draft.loading = false;
      return draft;
    },
    [`PATCH_${name}_LOADING`]: (draft: Draft<stateType>) => {
      draft.loading = true;
      return draft;
    },
    [`PATCH_${name}_ERROR`]: (draft: Draft<stateType>, action: actionType) => {
      draft.data = params.initialState.data;
      draft.error = action.error as string;
      draft.loading = false;
      return draft;
    },
  };
}
