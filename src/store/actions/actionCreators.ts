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

export const removeSet = (id: string, setId: string): removeSetAction => ({
  type: SET_ACTION_TYPES.REMOVE_SET,
  payload: {
    id,
    setId,
  },
});

export const addTerm = (term: Term, setId: string): addTermAction => ({
  type: TERM_ACTION_TYPES.ADD_TERM,
  payload: {
    term,
    setId,
  },
});

export const updateTerm = (term: Term, setId: string): updateTermAction => ({
  type: TERM_ACTION_TYPES.UPDATE_TERM,
  payload: {
    term,
    setId,
  },
});

export const removeTerm = (id: string, setId: string): removeTermAction => ({
  type: TERM_ACTION_TYPES.REMOVE_TERM,
  payload: {
    id,
    setId,
  },
});
