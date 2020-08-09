import { Reducer } from "redux";
import { TermsState } from "../types";
import { Term } from "../../data/entities";
import { TERM_ACTION_TYPES } from "../actions/actionTypes";

const initialState: TermsState = {
  terms: [],
  loading: false,
};

const termsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TERM_ACTION_TYPES.ADD_TERM: {
      const term = { ...action.payload };
      return {
        terms: [...state.terms, term],
        loading: false,
      };
    }
    case TERM_ACTION_TYPES.REMOVE_TERM: {
      const removedTermId = action.payload.id;
      return {
        terms: state.data.filter((term: Term) => term.id !== removedTermId),
        loading: false,
      };
    }
    case TERM_ACTION_TYPES.UPDATE_TERM:
      const updatedTermIndex = action.payload.id;

      return {
        terms: [
          ...state.terms.slice(0, updatedTermIndex),
          { ...action.payload },
          ...state.terms.slice(updatedTermIndex + 1, state.terms.length - 1),
        ],
        loading: false,
      };
    default:
      return state;
  }
};

export default termsReducer;
