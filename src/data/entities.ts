export interface Set {
  id: string;
  name: string;
  description: string;
  terms: Term[];
}

export interface Term {
  id: string;
  value: string;
  description: string;
}
