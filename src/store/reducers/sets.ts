import { Reducer } from "redux";
import { SetsState } from "../types";
import { Set } from "../../data/entities";
import { SET_ACTION_TYPES } from "../actions/actionTypes";

const initialState: SetsState = {
  sets: [],
  loading: false,
};

const setsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION_TYPES.ADD_SET: {
      const sets = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return {
        sets: [...state.sets, ...sets],
        loading: false,
      };
    }
    case SET_ACTION_TYPES.REMOVE_SET: {
      const removedSetId = action.payload.id;
      return {
        sets: state.data.filter((set: Set) => set.id !== removedSetId),
        loading: false,
      };
    }
    case SET_ACTION_TYPES.UPDATE_SET:
      const updatedSetIndex = action.payload.id;

      return {
        sets: [
          ...state.sets.slice(0, updatedSetIndex),
          { ...action.payload },
          ...state.sets.slice(updatedSetIndex + 1, state.sets.length - 1),
        ],
        loading: false,
      };
    default:
      return state;
  }
};

export default setsReducer;
