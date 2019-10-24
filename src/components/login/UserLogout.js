import React, { Component } from "react";
import { editVisitor } from "../../StaffApi";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import Shake from "react-reveal/Shake"; //https://www.react-reveal.com/examples/common/lightspeed/

//Note: the logout button is actually an edit as it goes back to the server and adds in the DateOut time.There is no delete.

const UserLogout = ({ allVisitors, handleDelete }) => (
  <div className="container">
    <div className="row">
      {allVisitors.map(item => {
        return (
          <div className="col col-md-3 col-sm-6  " key={item}>
            <Shake>
              <Card className="cardBody">
                <CardTitle className="conditions ">
                  {" "}
                  {item.firstName} {item.lastName}
                </CardTitle>
                <CardText>{item.business}</CardText>

                <button
                  className="button btn btn-danger btn-sm"
                  onClick={() => editVisitor(item)}>
                  Log Out
                </button>
              </Card>
            </Shake>
          </div>
        );
      })}
    </div>
  </div>
);

export default UserLogout;
