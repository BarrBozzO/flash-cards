import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Sets, Main, Auth } from "../";
import Theme, { Toggler as ToggleTheme } from "components/Theme";
import { ToastContainer } from "react-toastify";

import styles from "./App.module.scss";

function App() {
  return (
    <Theme>
      <div className={styles['app-content']}>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover 
      />
      <ToggleTheme />
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
