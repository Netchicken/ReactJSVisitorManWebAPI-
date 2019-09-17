import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
const history = createHistory();   //https://programmingwithmosh.com/react/react-router-add-the-power-of-navigation/

//this puts whatever is in the render method of the App into the root
ReactDOM.render(
  <Router history={history}>
    <App />
   
  </Router>,
  document.getElementById("root")
);
