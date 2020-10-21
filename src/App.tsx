import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Sets, Main, Auth } from "./screens";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover 
      />
    </div>
  );
}

export default App;
