import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Sets, Main, Auth } from "./screens";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/sets" component={Sets} />
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
