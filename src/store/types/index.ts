import { Set, Term } from "../../data/entities";

export interface SetsState {
  sets: Set[];
  loading: boolean;
}

export interface TermsState {
  terms: Term[];
  loading: boolean;
}

export interface StoreData {
  sets: SetsState;
  terms: TermsState;
}
