export type configType = {
  [key: string]: {
    name: string;
    method: string;
    initialState?: object;
  };
};

const cfg: configType = {
  sets: {
    name: "sets",
    method: "GET",
    initialState: [],
  },
  addSet: {
    name: "addSet",
    method: "POST",
  },
};

export default cfg;
