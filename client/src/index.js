import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { StoreProvider, Store } from "./store";

const store = new Store();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
