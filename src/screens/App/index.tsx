import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout } from "antd";
import { Sets, Main, Auth } from "../";
import Theme, { Toggler as ToggleTheme } from "components/Theme";
import PrivateRoute from "components/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";

function App() {
  toast.configure();

  return (
    <Theme>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <Layout className={styles["layout"]}>
        <Layout.Header className={styles["header"]}>
          <div className={styles["header-content"]}>
            <div className={styles["header-title"]}>Awesome Flash Cards</div>
            <ToggleTheme />
          </div>
        </Layout.Header>
        <Layout.Content className={styles["content"]}>
          <Router>
            <Switch>
              <Route path="/auth" component={Auth} />
              <PrivateRoute path="/sets" component={Sets} />
              <Route path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </Layout.Content>
      </Layout>
    </Theme>
  );
}

export default App;
