import React from "react";
import ApiContext from "./context";

type Props = {
  children: any;
  api: any;
};

function Provider(props: Props) {
  return (
    <ApiContext.Provider value={props.api}>
      {props.children}
    </ApiContext.Provider>
  );
}

export default Provider;
