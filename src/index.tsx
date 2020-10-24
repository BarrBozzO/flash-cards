import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./screens";
import { Provider } from "react-redux";
import appStore, { persistor } from "./store/";
import { configureApi, ApiProvider } from "./api";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";

const api = configureApi(appStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <PersistGate persistor={persistor} loading={null}>
        <ApiProvider api={api}>
          <App />
        </ApiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
