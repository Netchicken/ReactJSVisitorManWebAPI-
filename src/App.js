import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StaffIndex from "./components/staff/StaffIndex";
import AddStaffForm from "./components/staff/AddStaffForm";
import AllStaff from "./components/staff/AllStaff";
import StaffList from "./components/staff/StaffList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //make toasts
import "react-toastify/dist/ReactToastify.min.css";

import AllHome from "./components/home/AllHome";
import ConditionsList from "./components/home/ConditionsList";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={StaffIndex} />
          <Route path="/allstaff" component={AllStaff} />
          <Route path="/addstaffform" component={AddStaffForm} />
          <Route path="/stafflist" component={StaffList} />
           <Route path="/allhome" component={AllHome} />
            <Route path="/conditionslist" component={ConditionsList} />


        </Switch>
        <ToastContainer autoClose={6000} />
      </div>
    );
  }
}
export default App;
