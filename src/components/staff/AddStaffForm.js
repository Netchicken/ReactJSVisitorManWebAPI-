import React from "react";
import { newStaff, editStaff } from "../../StaffApi";
import { withRouter } from "react-router-dom"; //for history
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
      //editID: props.editID,
      buttonText: "Add Staff",

      addStaff: {
        // id: 0,
        name: "",
        department: "",
        visitorCount: 0
      },

      editStaff: {
        id: props.editID,
        name: props.editStaff.name,
        department: props.editStaff.department,
        visitorCount: props.editStaff.visitorCount
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // redirectToHome = () => {
  //   //https://dev.to/kozakrisz/react-router---how-to-pass-history-object-to-a-component-3l0j
  //   const { history } = this.props;
  //   if (history) history.push("/AllStaff");
  // };

  componentDidMount() {
    if (this.props.editID !== "") {
      //pass across the editID and then extract name and details from staff object
      toast(
        <div>
          componentDidMount Editing ...{this.props.editStaff.id}{" "}
          {this.props.editStaff.name} {this.props.editStaff.department}
        </div>
      );
    }
  }
  //https://stackoverflow.com/questions/50557662/unmounting-a-react-component-the-correct-way
  componentWillUnmount() {
    console.log("unmount");
  }

  GoBack() {
    // this.props.history.push("/allstaff");
    //https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
    // this.forceUpdate();

    var handleToUpdate = this.props.handleToUpdate;
    handleToUpdate("From the child Nice Update notice to be created"); //https://jsfiddle.net/ybeaz/e3Lab2ht/
    //  this.props.destroy(this.props.id);
    console.log("/allstaff");
  }

  //componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

  //Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.isAdding !== prevState.isAdding) {
      newStaff(this.state.addStaff);
      this.setState({
        isAdding: true
      });
      this.GoBack();
    }

    if (this.state.isEditing !== prevState.isEditing) {
      editStaff(this.state.editStaff);
      this.setState({
        isEditing: false
      });
      this.GoBack();
      //  history.push("/AllStaff");
    }
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
        " dept " +
        data.get("department") +
        " vc " +
        data.get("visitorCount")
    );
    //if there is no editID because we make a new staff
    if (this.props.editID === "") {
      this.UpdateAddState(data); //now with prevstate
    } else {
      this.UpdateEditState(data); //now with prevstate

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
    console.log("adding ...");
    this.setState(prevState => ({
      isAdding: true,
      addStaff: {
        ...prevState.addStaff, //pass the new data across to addStaff
        name: data.get("name"),
        department: data.get("department")
      }
    }));
    console.log("adding finished ...");
  }

  UpdateEditState(data) {
    console.log("updating ...");
    //use prevstate when state refuses to update
    this.setState(prevState => ({
      isEditing: true,
      editStaff: {
        ...prevState.editStaff,
        name: data.get("name"),
        department: data.get("department")
      }
    }));
    console.log("update finished");
  }

  // this.staff.splice(id - 1, 1, staff);
  //https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f

  //We add a novalidate attribute (noValidate in jsx turns into novalidate in html). The name of the attribute is somewhat misleading. When we add it, we do not actually turn off form validation. We only prevent the browser from interfering when an invalid form is submitted so that we can “interfere” ourselves.

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} key={this.props.editID} noValidate>
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
            onChange={e => this.setState({ tempDepartment: e.target.value })}
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
            <button type="submit" className="btn btn-primary">
              {this.props.editID !== ""
                ? "Edit Staff #" + this.props.editID
                : "Add Staff"}
            </button>
          </div>
        </form>
        IsEditing {this.state.editStaff.isEditing ? "True" : "False"}
        {this.state.res && (
          <div className="res-block">
            <h3>Data to be sent:</h3>
            <pre>FormData {this.state.res}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AddStaffForm);
