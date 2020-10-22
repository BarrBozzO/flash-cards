import { Action } from "redux";

export enum AUTH_ACTION_TYPES {
  AUTH_SIGNIN_START = "AUTH_SIGNIN_START",
  AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS",
  AUTH_SIGNIN_ERROR = "AUTH_SIGNIN_ERROR",
  AUTH_SIGNUP_START = "AUTH_SIGNUP_START",
  AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS",
  AUTH_SIGNUP_ERROR = "AUTH_SIGNUP_ERROR",
}

export interface signInAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNIN_START> {}

export interface signInSuccessAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNIN_SUCCESS> {
  payload: {
    email: string;
    id: string;
    token: object;
  }
}

export interface signInErrorAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNIN_ERROR> {
  error: string
}

export interface signUpAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNUP_START> {}

export interface signUpSuccessAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNUP_SUCCESS> {
  payload: {
    email: string;
    id: string;
    token: object;
  }
}

export interface signUpErrorAction extends Action<AUTH_ACTION_TYPES.AUTH_SIGNUP_ERROR> {
  error: string
}


// GENERAL
export enum GENERAL_ACTION_TYPES {
  TOGGLE_THEME= "TOGGLE_THEME"
}

export interface toggleThemeAction extends Action<GENERAL_ACTION_TYPES.TOGGLE_THEME> {
}