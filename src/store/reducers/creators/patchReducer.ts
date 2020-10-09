import { Action } from "redux";
import { Draft } from "immer";

type paramsType = {
  initialState: any;
  name: string;
  type?: 'collection' | 'item'
};


type itemData = { id: string };

type collectionData =  itemData[];

type stateType = {
  loading: boolean;
  error: null | string;
  data: itemData | collectionData
};

type actionType = Action & {
  payload?: any;
  error?: string | null;
};

type dataItemType = {
  id: string;
};

function isCollection(type: 'collection' | 'item', data: itemData | collectionData): data is collectionData  {
  return type === 'collection'; 
}

export default function (params: paramsType) {
  const name = params.name.toUpperCase();
  const type = params.type || 'collection';
  return {
    [`PATCH_${name}_SUCCESS`]: (
      draft: Draft<stateType>,
      action: actionType
    ) => {
      
      if(isCollection(type, draft.data)) {
        const patchId = action.payload.id;
        const patchIndex = draft.data.findIndex(
          (item: dataItemType) => item.id === patchId
        );
  
        if (patchIndex > -1) {
          draft.data[patchIndex] = {
            ...action.payload,
          };
        }
      } else {
        draft.data = {
          ...action.payload
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
