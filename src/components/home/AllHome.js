import React from "react";
import { getConditions } from "../../StaffApi";
import ConditionsList from "./ConditionsList";
class AllHome extends React.Component {

  constructor(props) {
    super(props);
    //make items array to hold staff initialized as empty
    this.state = {
      string:"",
      conditions: [],
      isLoaded: false,
         };
  }

componentDidMount() {
    getConditions().then(c => {
         this.setState(() => ({
           conditions: c,
           isLoaded: true
         }));
   //   this.createArray(c); 
    } )
    }


createArray(c){
this.setState(() => ({
        conditions: c.split(",")
             }));
}

  render() {
 const { isLoaded } = this.state; //pass across the state

    if (!isLoaded) {
      return (
        <div>
          Loading ...
               </div>
    );
  } else {
      return (
        <div>
          Conditions List
          <ConditionsList conditions={this.state.conditions} />
        </div>
      );
    }
  }
}
export default AllHome;






