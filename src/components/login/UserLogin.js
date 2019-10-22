import React, { Component } from "react";
import { toast } from "react-toastify";
import { visitorLogin } from "../../StaffApi";
import { UserLoginLog, UserLoginLog2 } from "../../AllLogs";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"; //https://stackoverflow.com/questions/53530538/dynamically-create-dropdown-menu-options-from-array-with-react-bootstrap

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        id: 0,
        firstName: "",
        lastName: "",
        business: "",
        dateIn: 0,
        dateOut: 0,
        staffName: ""
      },
      dropdownOpen: false,
      saveVisitor: false,
      dropDownValue: "",
      inputBoxEnabled: false
    };

    this.changeDropDownValue = this.changeDropDownValue.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount(e) {
  //    data = new FormData(e.target);
  //     };

  //Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

  //because you can't count on state being updated when you tell it to, when it finally decides to then it will run this method and we can update the backend and tell the AllStaff
  componentDidUpdate(prevProps, prevState) {
    if (prevState != this.state) {
      // console.log(".");
      //       if (this.state.saveVisitor === true) {
      //      }
    }
  }
  //https://reactstrap.github.io/components/dropdowns/
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //https://medium.com/front-end-weekly/react-quick-tip-easy-data-binding-with-a-generic-onchange-handler-fb0254a7094e

  //https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15
  handleChange(e) {
    const name = e.target.name;
    const newValue = e.target.value;
    this.setState(prevState => ({
      login: {
        ...this.state.login,
        [name]: newValue,
        staffName: this.state.dropDownValue
      }
    }));
    console.log(name); // the name of the form element
    console.log([name]); // the name of the form element []
    console.log(newValue); // the value of the form element
    console.log(
      "Staffname " +
        this.state.staffName +
        " dropDownValue " +
        this.state.dropDownValue
    );
  }

  //passes the value from the dropdownbox to the staffNames property
  changeDropDownValue(e) {
    const name = e.target.name;
    const newValue = e.currentTarget.textContent; //   e.target.value;

    this.setState({
      inputBoxEnabled: true,
      dropDownValue: newValue,
      login: { staffName: newValue }
    });

    console.log(this.state.inputBoxEnabled); // the name of the form element
    console.log(name); // the name of the form element
    // console.log([name]); // the name of the form element []
    // console.log(newValue); // the value of the form element
  }

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
    // const data = new FormData(event.target);
    // this.setState(() => ({
    //   ...this.state.login,
    //   login: {
    //     staffName: data.get("staffName"),
    //     firstName: data.get("firstName"),
    //     lastName: data.get("lastName"),
    //     business: data.get("business"),
    //     id: data.get("id"),
    //     dateIn: data.get("dateIn"),
    //     dateOut: data.get("dateOut")
    //   }
    // }));

    toast.success("triggered handleSubmit");

    this.setState(() => ({ saveVisitor: true }));

    toast(
      <div>
        {this.state.login.firstName} {this.state.login.lastName} has been added
        {this.state.saveVisitor}
      </div>
    );

    // UserLoginLog2(this.state.login);
    visitorLogin(this.state.login);

    toast.success("We did it!");
    //reset the save to false
    // this.setState({
    //   saveVisitor: false
    // });
  }

  canBeSubmitted() {
    //https://goshakkk.name/form-recipe-disable-submit-button-react/
    //returns a bool to see that there is data in all teh fields and it can be submitted
    const { firstName, lastName, staffName, business } = this.state.login;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

    //if there is anything in the variables - otherwise returns undefined
    if (firstName && lastName && staffName && business) {
      console.log("firstname length    " + firstName.length);
      //then count and see that they are greater than 0.  -  js is really crap
      return firstName.length !== 0 &&
        lastName.length !== 0 &&
        staffName.length !== 0 &&
        business.length !== 0
        ? true
        : false;
    } else {
      return false;
    }
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <Dropdown
            isOpen={this.state.dropdownOpen}
            size="sm"
            toggle={this.toggle}>
            <DropdownToggle variant="success" id="dropdown-basic">
              {this.state.dropDownValue !== ""
                ? this.state.dropDownValue
                : "Choose Staff  Member First"}
            </DropdownToggle>

            <DropdownMenu>
              {this.props.allStaff.map((item, index) => (
                <DropdownItem key={index}>
                  <div onClick={this.changeDropDownValue}> {item}</div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={this.state.login.firstName}
            onChange={this.handleChange}
            //  disabled={this.state.inputBoxEnabled}
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.login.lastName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Business"
            name="business"
            value={this.state.login.business}
            onChange={this.handleChange}
          />

          <input
            type="text"
            placeholder="Staff name"
            name="staffName"
            value={this.state.login.staffName}
            onChange={this.handleChange}
          />
        </div>

        <input
          type="hidden"
          placeholder="Date In"
          name="dateIn"
          // value={this.state.login.dateIn}
          //   onChange={this.handleChange}
        />
        <input
          type="hidden"
          placeholder="Date Out"
          name="dateOut"
          // value={this.state.login.dateOut}
          //  onChange={this.handleChange}
        />

        <input
          placeholder="ID"
          name="id"
          type="hidden"
          name="id"
          // value={this.state.login.id}
          // onChange={this.handleChange}
        />

        <div className="row">
          <button
            type="submit"
            value="Submit"
            disabled={!isEnabled}
            className="buttonSubmit btn btn-primary">
            {isEnabled ? "Visitor Login" : "Complete all fields"}
          </button>
        </div>
      </form>
    );
  }
}

export default UserLogin;
