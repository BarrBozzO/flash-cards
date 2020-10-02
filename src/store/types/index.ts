import { Set, Term } from "data/entities";

export interface SetsState {
  data: Set[];
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

export type apiActionCreatorParams = {
  payload?: any;
  error?: string | null;
};
