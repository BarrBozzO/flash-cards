import produce from "immer";
import { AUTH_ACTION_TYPES } from "../actions/actionTypes";

const initialState = {
    data: {},
    loading: false,
    error: null
};


const AuthReducer = produce((draft, action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_START: {
            draft.loading = true;
        }
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_SUCCESS: {
            draft.loading = false;
            draft.data = action.payload;
            draft.error = null;
        }
        case AUTH_ACTION_TYPES.AUTH_SIGNIN_ERROR: {
            draft.loading = false;
            draft.error = action.payload;
            draft.data = {};
        }
    }
}, initialState);

export default AuthReducer;