import {
  signInAction,
  signInErrorAction,
  signInSuccessAction,
  signUpAction,
  signUpErrorAction,
  signUpSuccessAction,
  AUTH_ACTION_TYPES,
  GENERAL_ACTION_TYPES,
  toggleThemeAction
} from "./actionTypes";

export const signInStart = (): signInAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNIN_START,
});

export const signInSuccess = (data: any): signInSuccessAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNIN_SUCCESS,
  payload: {
    email: data.email,
    id: data.id,
    token: {
        ...data.token
    }
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
    email: data.email,
    id: data.id,
    token: {
        ...data.token
    }
  }
});

export const signUpError = (error: string): signUpErrorAction => ({
  type: AUTH_ACTION_TYPES.AUTH_SIGNUP_ERROR,
  error
});

export const authActionCreators = { signInStart, signInSuccess, signInError,  signUpStart, signUpSuccess, signUpError};

export const toggleTheme = (): toggleThemeAction => ({
  type: GENERAL_ACTION_TYPES.TOGGLE_THEME
});

export const generalActionCreators = { toggleTheme };