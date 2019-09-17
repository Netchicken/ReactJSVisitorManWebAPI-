import { toast } from "react-toastify";

const baseUrl = "https://localhost:44370/api/StaffNamesAPI";

export async function handleResponse(response) {
  if (response.ok) return response.json();
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
  console.error("API call failed. " + error);
  throw error;
}

//https://dev.to/patrickgordon/react-redux-and-apis-part-two-react-only-dry-58jg

export function getAllStaff() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

//  Content-Type: application/json is what the server must send to the client and the client must send Accept to tell the server which type of response it accepts.   Allow: "GET,POST",// POST for create, PUT to update when id already exists.//alert(data.name + " " + data.department);
export function newStaff(data) {
  console.log("New Staff " + data.name + " " + data.department);
  LogThis(data);
  //try this 'content-type': 'multipart/form-data'
  return fetch(baseUrl, {
    mode: "cors",
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
   // .then(this.history.push("/AllStaff"));
  //.then(response => response.json())
  // .then(responseJson => {
  //   this.props.history.push("/AllStaff");
  //  });
}

// .then(handleResponse)
//  .catch(handleError);
//}

export function editStaff(data) {
  LogThis(data);
  return fetch(baseUrl + "/" + data.id, {
    mode: "cors",
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    //.then(this.props.history.push("/AllStaff"));
  //  .then(handleResponse)
  //  .catch(handleError);
}

export function deleteStaff(id) {
  return fetch(baseUrl + "/" + id, {
    mode: "cors",
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  })
    .then(() => {
      toast.success("Staff Deleted.");
      // history.push("/AllStaff"); //goes back to the last page
    })
    .then(handleResponse)
    .catch(handleError);
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
      baseUrl +
      "/" +
      data.id
  );
}
