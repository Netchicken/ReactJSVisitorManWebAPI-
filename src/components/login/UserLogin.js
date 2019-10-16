import React, { Component } from "react";
import { toast } from "react-toastify";
import { visitorLogin } from "../../StaffApi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"; //https://stackoverflow.com/questions/53530538/dynamically-create-dropdown-menu-options-from-array-with-react-bootstrap

class UserLogin extends Component {
  constructor(props) {
    super(props);

    var date = new Date().getDate();
    this.state = {
      id: 0,
      firstName: "",
      lastName: "",
      business: "",
      dateIn: 0,
      dateOut: 0,
      staffName: "",
      dropdownOpen: false
    };

    this.changeValue = this.changeValue.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  //https://reactstrap.github.io/components/dropdowns/
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //passes the value from the dropdownbox to the staffNames property
  changeValue(e) {
    this.setState({ staffName: e.currentTarget.textContent });
  }

  //   changeHandler = event => {
  //     this.setState({
  //       firstName: event.target.value
  //     });
  //   };

  stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
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
    const data = new FormData(event.target);
    //send to DB
    //visitorLogin(this.stringifyFormData(data));
    visitorLogin(data);

    // this.setState({
    //   res: this.stringifyFormData(data)
    // });

    console.log(
      //cool but not supported in IE
      " UserLogin data  firstName " +
        data.get("firstName") +
        " lastName " +
        data.get("lastName") +
        " dateIn " +
        data.get("dateIn") +
        " dateOut " +
        data.get("dateOut") +
        " staffName " +
        data.get("staffName") +
        " id " +
        data.get("id")
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <input
            placeholder="First name"
            type="firstName"
            name="firstName"
            defaultValue={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />

          <input
            type="lastName"
            placeholder="Last Name"
            name="lastName"
            defaultValue={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <input
            type="business"
            placeholder="Business"
            name="business"
            defaultValue={this.state.business}
            onChange={e => this.setState({ business: e.target.value })}
          />

          <Dropdown
            isOpen={this.state.dropdownOpen}
            size="sm"
            toggle={this.toggle}>
            <DropdownToggle variant="success" id="dropdown-basic">
              {this.state.staffName !== ""
                ? this.state.staffName
                : "Choose Staff  Member"}
            </DropdownToggle>

            <DropdownMenu>
              {this.props.allStaff.map((item, index) => (
                <DropdownItem key={index}>
                  <div onClick={this.changeValue}> {item}</div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <input
            type="staffName"
            placeholder="Staff name"
            name="staffName"
            defaultValue={this.state.staffName}
            onChange={e => this.setState({ staffName: e.target.value })}
          />
        </div>

        <input
          type="hidden"
          placeholder="Date In"
          name="dateIn"
          defaultValue={this.state.dateIn}
          //  onChange={e => this.setState({ dateIn: e.target.value })}
        />
        <input
          type="hidden"
          placeholder="Date Out"
          name="dateOut"
          defaultValue={this.state.dateOut}
          //  onChange={e => this.setState({ dateIn: e.target.value })}
        />

        <input
          placeholder="ID"
          name="id"
          type="hidden"
          defaultValue={this.state.id}
          // onChange={e => this.setState({ tempDepartment: e.target.value })}
        />

        <div className="row">
          <button type="submit" className="buttonSubmit btn btn-primary">
            Visitor Login
          </button>
        </div>
      </form>
    );
  }
}

export default UserLogin;
