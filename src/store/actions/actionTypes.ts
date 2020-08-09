import { Action } from "redux";
import { Set, Term } from "../../data/entities";

export enum SET_ACTION_TYPES {
  ADD_SET = "ADD_SET",
  REMOVE_SET = "REMOVE_SET",
  UPDATE_SET = "UPDATE_SET",
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
    id: number;
  };
}

export interface updateSetAction extends Action<SET_ACTION_TYPES.UPDATE_SET> {
  payload: Set;
}

export interface addTermAction extends Action<TERM_ACTION_TYPES.ADD_TERM> {
  payload: Term;
}

export interface removeTermAction
  extends Action<TERM_ACTION_TYPES.REMOVE_TERM> {
  payload: {
    id: number;
  };
}

export interface updateTermAction
  extends Action<TERM_ACTION_TYPES.UPDATE_TERM> {
  payload: Term;
}
