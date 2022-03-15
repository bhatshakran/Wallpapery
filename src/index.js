import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store/main";
import "./index.css";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "./firebase";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
