import React from "react";
import { Switch, Route } from "react-router-dom";
import AllSets from "./AllSets";
import SetTerms from "./SetTerms";

function Sets() {
  return (
    <div>
      <Switch>
        <Route path="/sets/:id" component={SetTerms} />
        <Route component={AllSets} />
      </Switch>
    </div>
  );
}

export default Sets;
