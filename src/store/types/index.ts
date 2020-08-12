import { Set, Term } from "data/entities";

export interface SetsState {
  sets: Set[];
  loading: boolean;
  error: string | null;
}

export interface TermsState {
  terms: Term[];
  loading: boolean;
}

export interface StoreData {
  sets: SetsState;
  terms: TermsState;
}
