import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import appStore from "./store/";
import { configureApi, ApiProvider } from "./api";
import * as serviceWorker from "./serviceWorker";

const api = configureApi(appStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ApiProvider api={api}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
