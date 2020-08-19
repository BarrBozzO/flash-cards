import { Reducer } from "redux";
import produce, { Draft } from "immer";
import { SetsState } from "../types";
import { Set, Term } from "data/entities";
import {
  SET_ACTION_TYPES,
  TERM_ACTION_TYPES,
  SETS_ACTION_TYPES,
  SETS_ACTION_CREATOR_TYPES,
} from "../actions/actionTypes";

const initialState: SetsState = {
  sets: [],
  error: null,
  loading: false,
};

const setsReducer: Reducer = produce(
  (draft: Draft<SetsState>, action: SETS_ACTION_CREATOR_TYPES) => {
    switch (action.type) {
      case SETS_ACTION_TYPES.SETS_FETCHING_START: {
        draft.error = null;
        draft.loading = true;
        break;
      }
      case SETS_ACTION_TYPES.SETS_FETCHING_ERROR: {
        draft.error = action.error;
        draft.loading = false;
        break;
      }
      case SETS_ACTION_TYPES.SETS_FETCHING_SUCCESS: {
        return {
          sets: action.payload,
          error: null,
          loading: false,
        };
      }
      case SET_ACTION_TYPES.ADD_SET: {
        const sets = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        draft.sets.push(...sets);
        draft.loading = false;
        break;
      }
      case SET_ACTION_TYPES.REMOVE_SET: {
        const removedSetId = action.payload.id;
        draft.sets = draft.sets.filter((set: Set) => set.id !== removedSetId);
        draft.loading = false;
        break;
      }
      case SET_ACTION_TYPES.UPDATE_SET:
        const updatedSetIndex = draft.sets.findIndex(
          (set: Set) => set.id === action.payload.id
        );
        draft.sets[updatedSetIndex] = { ...action.payload };
        draft.loading = false;
        break;
      case TERM_ACTION_TYPES.ADD_TERM: {
        const { term, setId } = action.payload;
        const targetSetIndex = draft.sets.findIndex(
          (set: Set) => set.id === setId
        );
        const isNotFound = targetSetIndex === -1;

        if (!isNotFound) {
          draft.sets[targetSetIndex].terms.push({ ...term });
        }

        break;
      }
      case TERM_ACTION_TYPES.UPDATE_TERM: {
        const { term, setId } = action.payload;
        const targetSetIndex = draft.sets.findIndex(
          (set: Set) => set.id === setId
        );
        const isNotFound = targetSetIndex === -1;

        if (!isNotFound) {
          const updatedTermIndex = draft.sets[targetSetIndex].terms.findIndex(
            (term) => term.id === term.id
          );
          if (updatedTermIndex > -1) {
            draft.sets[targetSetIndex].terms[updatedTermIndex] = { ...term };
          }
        }

        break;
      }
      case TERM_ACTION_TYPES.REMOVE_TERM: {
        const { id, setId } = action.payload;
        const targetSetIndex = draft.sets.findIndex(
          (set: Set) => set.id === setId
        );
        const isNotFound = targetSetIndex === -1;

        if (!isNotFound) {
          draft.sets[targetSetIndex].terms = draft.sets[
            targetSetIndex
          ].terms.filter((term: Term) => term.id !== id);
          draft.loading = false;
        }

        break;
      }
    }
  },
  initialState
);

export default setsReducer;
