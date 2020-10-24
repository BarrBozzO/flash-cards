import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Sets, Main, Auth } from "../";
import Theme, { Toggler as ToggleTheme } from "components/Theme";
import PrivateRoute from "components/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import styles from "./App.module.scss";

function App() {
  toast.configure();

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
            <PrivateRoute path="/sets" component={Sets} />
            <Route path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
