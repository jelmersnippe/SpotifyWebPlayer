import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { DataLayer } from "./DataLayer";
import reducer, { initialState } from "./reducer";

ReactDOM.render(
  // Initialize the global DataLayer with the defined initialState and reducer in their respective file
  <DataLayer initialState={initialState} reducer={reducer}>
    {/* Wrap the app with a BrowserRouter to allow for Routing in the app */}
    <Router>
      <App />
    </Router>
  </DataLayer>,
  document.getElementById("root")
);
