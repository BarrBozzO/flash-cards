import { Set, Term } from "data/entities";

export interface SetsState {
  data: Set[];
  loading: boolean;
  error: string | null;
}

export interface SetState {
  data: Set;
  loading: boolean;
  error: string | null;
}

export interface TermsState {
  data: Term[];
  loading: boolean;
  error: string | null;
}

export interface GeneralState {
  theme: 'light' | 'dark'
}

export interface StoreData {
  sets: SetsState;
  set: SetState;
  terms: TermsState;
  general: GeneralState
}

export type apiActionCreatorParams = {
  payload?: any;
  error?: string | null;
};
