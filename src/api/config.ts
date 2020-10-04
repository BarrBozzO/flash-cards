export type configType = {
  [key: string]: configItem;
};

export type configItem = {
  name: string;
  reducer?: {
    name: string;
    initialState?: object;
  };
  method: "get" | "post" | "patch" | "delete" | "put";
  url: string;
};

export type configItemWithReducer = Required<configItem>;

const cfg: configType = {
  sets: {
    name: "sets",
    method: "get",
    url: "sets",
    reducer: {
      name: "sets",
      initialState: [],
    },
  },
  addSet: {
    name: "addSet",
    reducer: {
      name: "sets",
    },
    url: "sets",
    method: "post",
  },
  updateSet: {
    name: "updateSet",
    reducer: {
      name: "sets",
    },
    url: "sets",
    method: "patch",
  },
  getSet: {
    name: "getSet",
    reducer: {
      name: "sets",
    },
    url: "sets",
    method: "get",
  },
  deleteSet: {
    name: "deleteSet",
    reducer: {
      name: "sets",
    },
    url: "sets",
    method: "delete",
  },
  terms: {
    name: "terms",
    reducer: {
      name: "terms",
      initialState: [],
    },
    url: "terms",
    method: "get",
  },
  addTerm: {
    name: "addTerm",
    reducer: {
      name: "terms",
    },
    url: "terms",
    method: "post",
  },
  updateTerm: {
    name: "updateTerm",
    reducer: {
      name: "terms",
    },
    url: "terms",
    method: "patch",
  },
  deleteTerm: {
    name: "removeTerm",
    reducer: {
      name: "terms",
    },
    url: "terms",
    method: "delete",
  },
};

export default cfg;
