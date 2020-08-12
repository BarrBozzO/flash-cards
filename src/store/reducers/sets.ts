import { Reducer } from "redux";
import { SetsState } from "../types";
import { Set } from "../../data/entities";
import { SET_ACTION_TYPES, SETS_ACTION_TYPES } from "../actions/actionTypes";

const initialState: SetsState = {
  sets: [],
  error: null,
  loading: false,
};

const setsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETS_ACTION_TYPES.SETS_FETCHING_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case SETS_ACTION_TYPES.SETS_FETCHING_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case SETS_ACTION_TYPES.SETS_FETCHING_SUCCESS: {
      return {
        sets: action.payload,
        error: null,
        loading: false,
      };
    }
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
