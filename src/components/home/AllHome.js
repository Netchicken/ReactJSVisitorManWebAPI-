import React from "react";
import { getConditions, getAllStaff, getAllVisitors } from "../../StaffApi";
import ConditionsList from "./ConditionsList";
import UserLogin from "../login/UserLogin";
import UserLogout from "../login/UserLogout";
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
    getAllStaff().then(c => {
      this.setState(() => ({
        allStaff: c
      }));
    });

    getAllVisitors().then(c => {
      this.setState(() => ({
        allVisitors: c
      }));
    });

    getConditions().then(c => {
      this.setState(() => ({
        conditions: c,
        isLoaded: true
      }));
    });
  }

  render() {
    const { isLoaded } = this.state; //pass across the state

    if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          Conditions List
          <ConditionsList conditions={this.state.conditions} />
          Visitors Log Out
          <UserLogout allVisitors={this.state.allVisitors} />
          Visitor Input form
          <UserLogin allStaff={this.state.allStaff} />
        </div>
      );
    }
  }
}
export default AllHome;
