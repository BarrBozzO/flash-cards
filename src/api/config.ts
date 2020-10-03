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
};

export default cfg;