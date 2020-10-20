import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Sets, Main, Auth } from "../";
import Theme from "components/Theme";

import styles from "./App.module.scss";


function App() {
  return (
    <Theme>
      <div className={styles['app-content']}>
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/sets" component={Sets} />
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </Router>
      </div>
    </Theme>
  );
}

export default App;
