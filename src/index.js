import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { DataLayer } from "./DataLayer";
import reducer, { initialState } from "./reducer";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
