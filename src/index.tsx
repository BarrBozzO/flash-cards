import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./screens";
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

serviceWorker.unregister();
