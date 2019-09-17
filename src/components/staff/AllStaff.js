import React from "react";
import logo from "../logo512.png";
import AddStaffForm from "./AddStaffForm";
import { getAllStaff, deleteStaff } from "../../StaffApi";
import StaffList from "./StaffList";
import { toast } from "react-toastify";

class AllStaff extends React.Component {
  constructor(props) {
    super(props);
    //make items array to hold staff initialized as empty
    this.state = {
      staff: [],
      isLoaded: false,
      isAddStaffForm: false,
      editID: "",
      deleteID: "",

      editStaff: {
        id: 0,
        name: "",
        department: "",
        visitorCount: 0
      }
    };
  //  this.destroy = this.destroy.bind(this); //https://stackoverflow.com/questions/50557662/unmounting-a-react-component-the-correct-way
    //bind the button clicks to the methods
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    //https://stackoverflow.com/questions/55097195/react-js-no-access-control-allow-origin-header-is-present-on-the-requested-r

    //try this https://reactjsexample.com/tag/state/

    getAllStaff().then(s => {
      this.setState({
        staff: s,
        isLoaded: true
      });
    });
  }

  //this updates the staff list and is triggered in the AddStaffForm
  handleToUpdate = someArg => {
    //https://jsfiddle.net/ybeaz/e3Lab2ht/
    toast("We pass argument from Child to Parent: " + someArg);

    getAllStaff().then(s => {
      this.setState({
        staff: s,
        isLoaded: true,
        isAddStaffForm: false //closes the form when submit is hit
      });
    });
  };

  //https://stackoverflow.com/questions/50557662/unmounting-a-react-component-the-correct-way
  // destroy(elementKey) {
  //   console.log(elementKey);
  //   let result = this.state.data.filter(item => item.key !== elementKey);
  //   this.setState({ data: result });
  // }

  //button click methods
  handleAdd() {
    this.setState(state => ({
      isAddStaffForm: !state.isAddStaffForm,
      editID: "",
      deleteID: "",
      editStaff: ""
    }));

    //   toast(<div>Add Click </div>);
  }

  handleEdit(id) {
    this.setState(state => ({
      ...state,
      editStaff: this.state.staff.find(s => s.id == id), //find is like first or default while filter returns array[0]
      isAddStaffForm: !state.isAddStaffForm,
      editID: id,
      deleteID: ""
    }));
    console.log(
      "AllStaff L52 handleEdit" +
        "  id " +
        this.state.editStaff.id +
        "  name " +
        this.state.editStaff.name +
        " department " +
        this.state.editStaff.department +
        "  editID " +
        this.state.editID
    );
    // toast(
    //   <div>
    //     handleEdit Editing ...{this.state.editStaff.id}{" "}
    //     {this.state.editStaff.name} {this.state.editStaff.department}
    //   </div>
    // );
  }

  handleDelete(id) {
    this.setState(state => ({
      // deleteID: id,
      editID: ""
    }));
    deleteStaff(id);
  }

  render() {
    const { isLoaded } = this.state; //pass across the state
    if (!isLoaded) {
      return (
        <div>
          Loading ...
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <StaffList
                staff={this.state.staff}
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="col">
              <div className="row">
                {this.state.isAddStaffForm ? (
                  <AddStaffForm
                    staff={this.state.staff}
                    editID={this.state.editID}
                    editStaff={this.state.editStaff}
                    handleToUpdate={this.handleToUpdate}
                    destroy={this.destroy}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AllStaff;
