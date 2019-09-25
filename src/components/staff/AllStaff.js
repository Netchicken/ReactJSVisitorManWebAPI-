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
      },
      deleteStaff: {
        id: 0,
        name: "",
        department: ""
      }
    };

    //bind the button clicks to the methods
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getStaff(); //load staff when the page loads
  }
  componentDidUpdate(prevProps, prevState) {
    this.getStaff(); //loads staff when something changes, such as add or delete or edit
  }

  //get the staff from the DB
  getStaff() {
    getAllStaff().then(s => {
      this.setState(() => ({
        staff: s,
        isLoaded: true
      }));
    });
  }

  //this updates the staff list and is triggered in the AddStaffForm
  handleToUpdate = updatedStaff => {
    this.getStaff();
    //https://jsfiddle.net/ybeaz/e3Lab2ht/
    toast("Data updated! ");

    //this should force a refresh of the StaffList component as it changes the staff data by downloading it from the db
    //https://stackoverflow.com/questions/54320478/reactjs-state-not-updating
    console.log("AllStaff handleToUpdate L67");

    this.setState((state, props) => ({
      ...state,
      isLoaded: true,
      isAddStaffForm: !state.isAddStaffForm,
      editID: "",
      deleteID: "",
      editStaff: ""
    }));
  };

  //button click methods
  handleAdd() {
    this.setState(state => ({
      ...state,
      isAddStaffForm: !state.isAddStaffForm,
      editID: "",
      deleteID: "",
      editStaff: ""
    }));
  }

  //get the staff details in the row (id) from the db to pass to AddStaffForm
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
  }

  handleDelete(id) {
    this.setState(state => ({
      ...state,
      //get the staff to delete
      deleteStaff: this.state.staff.find(s => s.id == id) //find is like first or default while filter returns array[0]
    }));

    //get a confirmation

    //delete the staff
    deleteStaff(id); //delete from DB
    this.removeFromLocal(id);
  }

  //https://vegibit.com/how-to-delete-an-item-from-an-array-in-react/
  removeFromLocal(id) {
    //return back all the staff who are not deleted - sheesh....
    var notDeletedUsers = this.state.staff.filter(staff => staff.id !== id);
    this.setState({ staff: notDeletedUsers });
    // toast("Staff is deleted");
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
