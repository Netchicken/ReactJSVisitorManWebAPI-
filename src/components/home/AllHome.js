import React from "react";
import { getConditions, getAllStaff, getAllVisitors } from "../../StaffApi";
import ConditionsList from "./ConditionsList";
import UserLogin from "../login/UserLogin";
import UserLogout from "../login/UserLogout";
import { toast } from "react-toastify";
class AllHome extends React.Component {
  constructor(props) {
    super(props);
    //make items array to hold staff initialized as empty
    this.state = {
      string: "",
      conditions: [],
      allStaff: [],
      allVisitors: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getStaff();
    this.getVisitors();
    this.getTheConditions();
  }

  componentDidUpdate(prevProps, prevState) {
    this.getVisitors(); //loads staff when something changes, such as add or delete or edit
  }
  //method name getstaff contains call getallstaff
  getStaff() {
    getAllStaff().then(c => {
      this.setState(() => ({
        allStaff: c
      }));
    });
  }
  getVisitors() {
    getAllVisitors().then(c => {
      this.setState(() => ({
        allVisitors: c
      }));
    });
  }
  getTheConditions() {
    getConditions().then(c => {
      this.setState(() => ({
        conditions: c,
        isLoaded: true
      }));
    });
  }

  //this updates the visitors list and is triggered in the UserLogin
  handleToUpdate = () => {
    this.getVisitors();
    toast.success("New Visitor updated! ");
  };

  render() {
    const { isLoaded } = this.state; //pass across the state

    if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          <h2 className="col col-md-12 col-sm-12 heading">Conditions List</h2>
          <ConditionsList conditions={this.state.conditions} />
          <h2 className="col col-md-12 col-sm-12 heading">Visitors Log Out</h2>
          <UserLogout allVisitors={this.state.allVisitors} />
          <h2 className="col col-md-12 col-sm-12 heading">
            Visitor Login form
          </h2>
          <UserLogin
            allStaff={this.state.allStaff}
            handleToUpdate={this.handleToUpdate}
          />
        </div>
      );
    }
  }
}
export default AllHome;
