import {
  SET_ACTION_TYPES,
  TERM_ACTION_TYPES,
  SETS_ACTION_TYPES,
  addSetAction,
  updateSetAction,
  removeSetAction,
  addTermAction,
  updateTermAction,
  removeTermAction,
  getSetsAction,
  getSetsErrorAction,
  getSetsSuccessAction,
} from "./actionTypes";
import { Set, Term } from "data/entities";

export const getSetsStart = (): getSetsAction => ({
  type: SETS_ACTION_TYPES.SETS_FETCHING_START,
});

export const getSetsSuccess = (sets: Set[]): getSetsSuccessAction => ({
  type: SETS_ACTION_TYPES.SETS_FETCHING_SUCCESS,
  payload: sets,
});

export const getSetsError = (error: string): getSetsErrorAction => ({
  type: SETS_ACTION_TYPES.SETS_FETCHING_ERROR,
  error,
});

export const addSet = (sets: Set | Set[]): addSetAction => ({
  type: SET_ACTION_TYPES.ADD_SET,
  payload: sets,
});

export const updateSet = (set: Set): updateSetAction => ({
  type: SET_ACTION_TYPES.UPDATE_SET,
  payload: set,
});

export const removeSet = (id: number): removeSetAction => ({
  type: SET_ACTION_TYPES.REMOVE_SET,
  payload: {
    id,
  },
});

export const addTerm = (term: Term): addTermAction => ({
  type: TERM_ACTION_TYPES.ADD_TERM,
  payload: term,
});

export const updateTerm = (term: Term): updateTermAction => ({
  type: TERM_ACTION_TYPES.UPDATE_TERM,
  payload: term,
});

export const removeTerm = (id: string): removeTermAction => ({
  type: TERM_ACTION_TYPES.REMOVE_TERM,
  payload: {
    id,
  },
});
