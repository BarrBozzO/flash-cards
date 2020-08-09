import {
  SET_ACTION_TYPES,
  TERM_ACTION_TYPES,
  addSetAction,
  updateSetAction,
  removeSetAction,
  addTermAction,
  updateTermAction,
  removeTermAction,
} from "./actionTypes";
import { Set, Term } from "../../data/entities";

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

export const removeTerm = (id: number): removeTermAction => ({
  type: TERM_ACTION_TYPES.REMOVE_TERM,
  payload: {
    id,
  },
});
