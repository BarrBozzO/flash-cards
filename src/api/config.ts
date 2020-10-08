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
  transformResponse?: (...args: any[]) => any;
};

export type configItemWithReducer = Required<configItem>;

const cfg: configType = {
  sets: {
    name: "sets",
    method: "get",
    url: "collections",
    reducer: {
      name: "sets",
      initialState: [],
    },
    transformResponse: (response) => {
      const { data } = response;
      const sets = data.map(
        (item: { data: any; ref: { "@ref": { id: string } } }) => {
          return {
            ...item.data,
            id: item.ref["@ref"].id,
          };
        }
      );
      return sets;
    },
  },
  addSet: {
    name: "addSet",
    reducer: {
      name: "sets",
    },
    url: "collections",
    method: "post",
  },
  updateSet: {
    name: "updateSet",
    reducer: {
      name: "sets",
    },
    url: "collections",
    method: "patch",
  },
  getSet: {
    name: "getSet",
    reducer: {
      name: "set",
    },
    url: "collections",
    method: "get",
    transformResponse: (response) => {
      const { data }: { data: any; ref: { "@ref": { id: string } } } = response;
      return {
          ...data.data,
          id: data.ref["@ref"].id,
        };
    },
  },
  deleteSet: {
    name: "deleteSet",
    reducer: {
      name: "sets",
    },
    url: "collections",
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
    transformResponse: (response) => {
      const { data } = response;
      const terms = data.map(
        (item: { data: any; ref: { "@ref": { id: string } } }) => {
          return {
            ...item.data,
            id: item.ref["@ref"].id,
          };
        }
      );
      return terms;
    },
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
