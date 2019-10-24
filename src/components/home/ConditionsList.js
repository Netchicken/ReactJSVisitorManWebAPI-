import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import LightSpeed from "react-reveal/LightSpeed"; //https://www.react-reveal.com/examples/common/lightspeed/

//https://stackoverflow.com/questions/58333288/how-do-i-use-js-include-and-replace-inside-a-map-in-reactjs

//https://html5hive.org/creating-a-react-and-reactstrap-card-gallery/
//https://reactstrap.github.io/components/card/

const ConditionsList = props => {
  return (
    <div className="container">
      <div className="row">
        {props.conditions.map((item, index) => {
          return item.includes("Heading") ? (
            <h4 className="col col-md-12 col-sm-12 heading" key={index}>
              {item.replace("Heading", "")}
            </h4>
          ) : (
            <LightSpeed left>
              <div className="col col-md-3 col-sm-6  " key={index}>
                <Card className="cardBody">
                  <CardText className="conditions ">{item}</CardText>
                </Card>
              </div>
            </LightSpeed>
          );
        })}
      </div>
      
    </div>
  );
};

export default ConditionsList;
