import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

//https://stackoverflow.com/questions/58333288/how-do-i-use-js-include-and-replace-inside-a-map-in-reactjs

//https://html5hive.org/creating-a-react-and-reactstrap-card-gallery/
//https://reactstrap.github.io/components/card/


const ConditionsList = props => {
  return (
    <div class="row">
      {props.conditions.map((item, index) => {
       return item.includes("Heading") ? (
         <h2 class="col col-md-12 col-sm-12 heading">
           {item.replace("Heading", "")}
         </h2>
       ) : (
         <div class="col col-md-3 col-sm-6  ">
           <Card className="cardBody  ">
             <CardText className="conditions " Key={index}>
               {item}
             </CardText>
           </Card>
         </div>
       );
                  })}     
    </div>
  );
};

export default ConditionsList;
