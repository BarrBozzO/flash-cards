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
  signInAction,
  signInErrorAction,
  signInSuccessAction,
  signUpAction,
  signUpErrorAction,
  signUpSuccessAction,
  AUTH_ACTION_TYPES
} from "./actionTypes";
import { Set, Term } from "data/entities";

export const signInStart = (): signInAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNIN_START,
});

export const signInSuccess = (data: any): signInSuccessAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNIN_SUCCESS,
  payload: {
    email: data.email
  }
});

export const signInError = (error: string): signInErrorAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNIN_ERROR,
  error
});

export const signUpStart = (): signUpAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNUP_START,
});

export const signUpSuccess = (data: any): signUpSuccessAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNUP_SUCCESS,
  payload: {
    email: data.email
  }
});

export const signUpError = (error: string): signUpErrorAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNUP_ERROR,
  error
});

export const authActionCreators = { signInStart, signInSuccess, signInError,  signUpStart, signUpSuccess, signUpError};

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
