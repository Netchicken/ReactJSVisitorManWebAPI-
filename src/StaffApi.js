import { toast } from "react-toastify";
import {LogVisitorIN } from "AllLogs"
const localhost = "https://localhost:44370";
const baseStaffNamesUrl = localhost + "/api/StaffNamesAPI";
const baseHomeUrl = localhost + "/api/HomeAPI";
const baseVisitorUrl = localhost + "/api/VisitorAPI";

export async function handleResponse(response) {
  if (response.ok) {
    // toast.success("Staff Deleted from server");
    return response.json();
  }
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("StaffAPI API call failed. " + error);
  throw error;
}

//https://dev.to/patrickgordon/react-redux-and-apis-part-two-react-only-dry-58jg

//Get a list of all the staff names for the Dropdown list
export function getAllStaff() {
  return fetch(baseVisitorUrl)
    .then(handleResponse)
    .catch(handleError);
}

//Get the Conditions for acceptance
export function getConditions() {
  return fetch(baseHomeUrl)
    .then(handleResponse)
    .catch(handleError);
}

//  Content-Type: application/json is what the server must send to the client and the client must send Accept to tell the server which type of response it accepts.   Allow: "GET,POST",// POST for create, PUT to update when id already exists.//alert(data.name + " " + data.department);
export function newStaff(data) {
  console.log("StaffAPI New Staff " + data.name + " " + data.department);
  LogThis(data);
  //try this 'content-type': 'multipart/form-data'

  if (data.name != "" && data.department != "") {
    return fetch(baseStaffNamesUrl, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } else {
    console.log(
      "StaffAPI ADD Staff - Cannot have empty fields " +
        data.name +
        " " +
        data.department
    );
  }
}

// .then(handleResponse)
//  .catch(handleError);
//}

export function editStaff(data) {
  console.log("StaffAPI Edit Staff " + data.name + " " + data.department);
  LogThis(data);
  return fetch(baseStaffNamesUrl + "/" + data.id, {
    mode: "cors",
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export function deleteStaff(id) {
  return fetch(baseStaffNamesUrl + "/" + id, {
    mode: "cors",
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  }).then(() => {
    toast.success("Staff Deleted from server");
  });
  //  .then(handleResponse)
  //  .catch(handleError);
}

export function visitorLogin(data) {
  LogVisitorIN(data);
  //try this 'content-type': 'multipart/form-data'
  if (
    data.firstName != "" &&
    data.lastName != "" &&
    data.business != "" &&
    data.staffName != ""
  ) {
    return fetch(baseVisitorUrl + "/CreateVisitorLogin ", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "content-type": "application/json"
      },
      body: data // JSON.stringify(data)
    });
  } else {
    LogVisitorIN(data);
  }
}

function LogThis(data) {
  console.log(
    "StaffApi L59 " +
      data.id +
      " " +
      data.name +
      " " +
      data.department +
      "  " +
      baseStaffNamesUrl +
      "/" +
      data.id
  );
}

