import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import AllSets from "./AllSets";
import SetTerms from "./SetTerms";

function Sets() {
  return (
    <div>
      <Switch>
        <PrivateRoute path="/sets/:id" component={SetTerms} />
        <PrivateRoute component={AllSets} />
      </Switch>
    </div>
  );
}

export default Sets;
