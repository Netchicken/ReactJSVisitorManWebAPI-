import React from "react";
import { newStaff, editStaff } from "../../StaffApi";
//import { withRouter } from "react-router-dom"; //for history
import { toast } from "react-toastify";

class AddStaffForm extends React.Component {
  constructor(props) {
    super(props); //we use super to pass any props from the parent to the child component.
    //make items array to hold staff initialized as empty
    this.state = {
      staff: props.staff, //all of the staff
      id: "",
      tempName: props.editStaff.name,
      tempDepartment: props.editStaff.department,
      tempVisitorCount: props.editStaff.visitorCount,
      isEditing: false,
      isAdding: false,
      buttonText: "Add Staff",

      addStaff: {
        //this will be empty
        name: "",
        department: "",
        visitorCount: 0
      },

      editStaff: {
        //this will take in the props
        id: props.editID,
        name: props.editStaff.name,
        department: props.editStaff.department,
        visitorCount: props.editStaff.visitorCount
      }
    };
    //submit binding between button and method
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.editID !== "") {
  //     //pass across the editID and then extract name and details from staff object
  //     toast(
  //       <div>
  //         componentDidMount Editing ...{this.props.editStaff.id}{" "}
  //         {this.props.editStaff.name} {this.props.editStaff.department}
  //       </div>
  //     );
  //   }
  // }

  // GoBack() {
  //   this.setState({
  //     isAdding: false,
  //     isEditing: false
  //   });
  //   console.log("AddStaffForm  GoBack ");

  //  if (this.state.staff !== this.props.staff) {
  //if staff has been updated pass the change through
  //  } //https://jsfiddle.net/ybeaz/e3Lab2ht/
  //  this.props.destroy(this.props.id);
  // }
  //}

  //componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

  //Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

  //because you can't count on state being updated when you tell it to, when it finally decides to then it will run this method and we can update the backend and tell the AllStaff
  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   "componentDidUpdate prevstateAdding...  " +
    //     prevState.isAdding +
    //     " .... is state Adding .....  " +
    //     this.state.isAdding
    // );

    // Typical usage (don't forget to compare props):
    if (this.state.isAdding === true) {
      newStaff(this.state.addStaff); //update backend
      console.log("componentDidUpdate addstaff");
      this.setState({
        //reset the state to empty
        isAdding: false,
        isEditing: false
      });
      this.NotifyAllStaff(); //send off a notify to AllStaff
    }

    if (this.state.isEditing === true) {
      editStaff(this.state.editStaff); //edit backend
      console.log("componentDidUpdate editstaff");
      this.setState({
        //reset the state to empty
        isAdding: false,
        isEditing: false
      });
      this.NotifyAllStaff(); //send off a notify to AllStaff
    }
    //when the staff has updated then pass it up to AllStaff
  }

  //Hey AllStaff! We just updated the back end refresh your Staff list.
  NotifyAllStaff() {
    console.log("componentDidUpdate staff is !== to props");
    var handleToUpdate = this.props.handleToUpdate;
    handleToUpdate(this.state.staff);
  }

  //https://jsfiddle.net/everdimension/5ry2wdaa/
  //https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
  stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
  }

  //run the Add and Edit
  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      // form is invalid! so we do nothing no name or department
      //https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
      toast(<div>Please fix your errors ...</div>);
      return;
    }
    // form is valid! We can parse and submit data
    //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    //return all the form data from the names
    const data = new FormData(event.target);

    this.setState({
      res: this.stringifyFormData(data)
    });
    
    console.log(
      //cool but not supported in IE
      "FormData L80 " +
        data.get("id") +
        " name " +
        data.get("name") +
        " department " +
        data.get("department") +
        " visitorCount " +
        data.get("visitorCount")
    );
    //if there is no editID because we make a new staff
    if (this.props.editID === "") {
      this.UpdateAddState(data); //pass data to addstaff state
    } else {
      this.UpdateEditState(data); //pass data to editstaff state

      console.log(
        "This new Edited Staff " +
          this.state.editStaff.id +
          " name " +
          this.state.editStaff.name +
          " dept  " +
          this.state.editStaff.department +
          " vc  " +
          this.state.editStaff.visitorCount +
          "  bool  " +
          this.state.isEditing
      );
    }
  }

  UpdateAddState(data) {
    console.log("adding .... isAdding .....  " + this.state.isAdding);
    this.setState(prevState => ({
      isAdding: true, //used in  componentDidUpdate
      addStaff: {
        ...prevState.addStaff, //pass the new data across to addStaff
        name: data.get("name"),
        department: data.get("department")
      }
    }));
    console.log("adding finished ... isAdding .....  " + this.state.isAdding);
    //goes to componentDidUpdate
  }

  UpdateEditState(data) {
    console.log("updatingEdit State...");
    //use prevstate when state refuses to update dammit
    this.setState(prevState => ({
      isEditing: true, //used in  componentDidUpdate
      editStaff: {
        ...prevState.editStaff,
        name: data.get("name"),
        department: data.get("department")
      }
    }));
    console.log("updatingEdit finished");
    //goes to componentDidUpdate
  }

  // this.staff.splice(id - 1, 1, staff);
  //https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f

  //We add a novalidate attribute (noValidate in jsx turns into novalidate in html). The name of the attribute is somewhat misleading. When we add it, we do not actually turn off form validation. We only prevent the browser from interfering when an invalid form is submitted so that we can “interfere” ourselves.

  render() {
    return (
      <div className="container-fluid data-table">
        <div className="row">
          <div className="col">
            <form
              onSubmit={this.handleSubmit}
              key={this.props.editID}
              noValidate>
              <input
                placeholder="ID"
                id="id"
                name="id"
                type="hidden"
                value={this.props.editID}
                // onChange={e => this.setState({ tempDepartment: e.target.value })}
              />

              <input
                placeholder="Enter Name"
                id="name"
                name="name"
                type="text"
                required
                value={this.state.tempName}
                onChange={e => this.setState({ tempName: e.target.value })}
              />

              <input
                placeholder="Enter Department"
                id="department"
                name="department"
                type="text"
                required
                value={this.state.tempDepartment}
                onChange={e =>
                  this.setState({ tempDepartment: e.target.value })
                }
              />

              {/* <input
            placeholder="Visitor Count"
            id="visitorCount"
            name="visitorCount"
            type="hidden"
            value={this.state.visitorCount === "" ? 0 : this.state.visitorCount}
            //onChange={e => this.setState({  ...this.state.editStaff,   visitorCount: e.target.value   }) }
          /> */}

              <div className="row">
                <button type="submit" className="buttonSubmit btn btn-primary">
                  {this.props.editID !== ""
                    ? "Edit Staff #" + this.props.editID
                    : "Add Staff"}
                </button>
              </div>
            </form>
            {this.state.res && (
              <div className="res-block">
                <h3>Data to be sent:</h3>
                <pre>FormData {this.state.res}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddStaffForm;
