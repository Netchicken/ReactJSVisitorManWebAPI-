import React from "react";
import { getConditions, getAllStaff } from "../../StaffApi";
import ConditionsList from "./ConditionsList";
import UserLogin from "../login/UserLogin";
class AllHome extends React.Component {
  constructor(props) {
    super(props);
    //make items array to hold staff initialized as empty
    this.state = {
      string: "",
      conditions: [],
      allStaff: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    
    getAllStaff().then(c => {
      this.setState(() => ({
        allStaff: c
      }));
      //   this.createArray(c);
    });

    getConditions().then(c => {
      this.setState(() => ({
        conditions: c,
        isLoaded: true
      }));
      //   this.createArray(c);
    });
  }

  // createArray(c) {
  //   this.setState(() => ({
  //     conditions: c.split(",")
  //   }));
  // }

  render() {
    const { isLoaded } = this.state; //pass across the state

    if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          Conditions List
          <ConditionsList conditions={this.state.conditions} />
          Visitor Input form
          <UserLogin allStaff={this.state.allStaff} />
        </div>
      );
    }
  }
}
export default AllHome;
