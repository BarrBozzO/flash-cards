import produce from "immer";
import { GENERAL_ACTION_TYPES } from "../actions/actionTypes";

const initialState = {
    theme: 'light'
};


const GeneralReducer = produce((draft, action) => {
    switch (action.type) {
        case GENERAL_ACTION_TYPES.TOGGLE_THEME: {
            draft.theme =  draft.theme === 'light' ? 'dark' : 'light';
        }
        return draft;
    }
}, initialState);

export default GeneralReducer;