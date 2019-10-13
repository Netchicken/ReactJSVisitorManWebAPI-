import React from "react";
import { Link } from "react-router-dom";

//https://programmingwithmosh.com/react/react-router-add-the-power-of-navigation/
const StaffIndex = () => {
  return (
    <div>
      <Link to="/allstaff">Practice with All Staff</Link> <br></br>
      <Link to="./allHome">Practice with Conditions for Acceptance</Link>
    </div>
  );
};

export default StaffIndex;
