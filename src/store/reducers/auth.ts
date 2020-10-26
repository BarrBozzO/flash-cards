import produce from "immer";
import { AUTH_ACTION_TYPES } from "../actions/actionTypes";

const initialState = {
    data: {},
    loading: false,
    error: null
};


const AuthReducer = produce((draft, action) => {
    switch (action.type) {
        case "LOGOUT":
            draft.data = {};
            break;
        case AUTH_ACTION_TYPES.AUTH_SIGNUP_START:
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_START: {
            draft.loading = true;
            break;
        }
        case AUTH_ACTION_TYPES.AUTH_SIGNUP_SUCCESS:
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_SUCCESS: {
            draft.loading = false;
            draft.data = action.payload;
            draft.error = null;
            break;
        }
        case AUTH_ACTION_TYPES.AUTH_SIGNUP_ERROR:
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_ERROR: {
            draft.loading = false;
            draft.error = action.payload;
            draft.data = {};
            break;
        }
    }
}, initialState);

export default AuthReducer;