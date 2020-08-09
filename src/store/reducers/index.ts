import { combineReducers, Reducer } from "redux";
import setsReducer from "./sets";
import termsReducer from "./terms";

const rootReducer: Reducer = combineReducers({
  terms: termsReducer,
  sets: setsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
