export type configType = {
  [key: string]: configItem;
};

export type configItem = {
  name: string;
  reducerName?: string;
  method: "get" | "post" | "patch" | "delete" | "put";
  url: string;
  initialState?: object;
};

const cfg: configType = {
  sets: {
    name: "sets",
    method: "get",
    url: "sets",
    initialState: [],
  },
  addSet: {
    name: "addSet",
    reducerName: "sets",
    url: "sets",
    method: "post",
  },
};

export default cfg;
