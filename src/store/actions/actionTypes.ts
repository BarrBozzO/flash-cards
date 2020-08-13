import { Action } from "redux";
import { Set, Term } from "../../data/entities";

export enum SET_ACTION_TYPES {
  ADD_SET = "ADD_SET",
  REMOVE_SET = "REMOVE_SET",
  UPDATE_SET = "UPDATE_SET",
}

export enum SETS_ACTION_TYPES {
  SETS_FETCHING_START = "SETS_FETCHING_START",
  SETS_FETCHING_SUCCESS = "GET_SETS_SUCCESS",
  SETS_FETCHING_ERROR = "GET_SETS_ERROR",
}

export enum TERM_ACTION_TYPES {
  ADD_TERM = "ADD_TERM",
  REMOVE_TERM = "REMOVE_TERM",
  UPDATE_TERM = "UPDATE_TERM",
}

export interface addSetAction extends Action<SET_ACTION_TYPES.ADD_SET> {
  payload: Set | Set[];
}

export interface removeSetAction extends Action<SET_ACTION_TYPES.REMOVE_SET> {
  payload: {
    id: string;
    setId: string;
  };
}

export interface updateSetAction extends Action<SET_ACTION_TYPES.UPDATE_SET> {
  payload: Set;
}

export interface getSetsAction
  extends Action<SETS_ACTION_TYPES.SETS_FETCHING_START> {}

export interface getSetsSuccessAction
  extends Action<SETS_ACTION_TYPES.SETS_FETCHING_SUCCESS> {
  payload: Set[];
}

export interface getSetsErrorAction
  extends Action<SETS_ACTION_TYPES.SETS_FETCHING_ERROR> {
  error: string;
}

export interface addTermAction extends Action<TERM_ACTION_TYPES.ADD_TERM> {
  payload: {
    term: Term;
    setId: string;
  };
}

export interface removeTermAction
  extends Action<TERM_ACTION_TYPES.REMOVE_TERM> {
  payload: {
    id: string;
    setId: string;
  };
}

export interface updateTermAction
  extends Action<TERM_ACTION_TYPES.UPDATE_TERM> {
  payload: Term;
}

export type SETS_ACTION_CREATOR_TYPES =
  | addSetAction
  | updateSetAction
  | removeSetAction
  | getSetsAction
  | getSetsErrorAction
  | getSetsSuccessAction
  | addTermAction
  | removeTermAction;
