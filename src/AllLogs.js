// // In a real app, would likely call an error logging service.
// function handleError(error) {
//   // eslint-disable-next-line no-console
//   console.error("StaffAPI API call failed. " + error);
//   throw error;
// }

export function LogVisitorIN(data) {
  console.log(
    "LogVisitorIN StaffApi " +
      data.firstName +
      " lastName " +
      data.lastName +
      " dateIn " +
      data.dateIn +
      " dateOut " +
      data.dateOut +
      " staffName " +
      data.staffName +
      " id " +
      data.id
  );

  // console.log(
  //   "LogVisitorIN StaffApi " +
  //     data.get("firstName") +
  //     " lastName " +
  //     data.get("lastName") +
  //     " dateIn " +
  //     data.get("dateIn") +
  //     " dateOut " +
  //     data.get("dateOut") +
  //     " staffName " +
  //     data.get("staffName") +
  //     " id " +
  //     data.get("id")
  // );
}

export function LogThis(data) {
  console.log(
    "StaffApi L59 " +
      data.id +
      " " +
      data.name +
      " " +
      data.department +
      "  " +
      data.id
  );
}

export function UserLoginLog(data) {
  console.log(
    //cool but not supported in IE
    " UserLoginLog  firstName " +
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
export function UserLoginLog2(data) {
  console.log(
    
    " UserLoginLog  firstName " +
      data.firstName +
      " lastName " +
      data.lastName +
      " dateIn " +
      data.dateIn +
      " dateOut " +
      data.dateOut +
      " staffName " +
      data.staffName +
      " id " +
      data.id
  );
}

export function AddStaffFormLog(data) {
  console.log(
    //cool but not supported in IE
    " AddStaffForm FormData L80 " +
      data.get("id") +
      " name " +
      data.get("name") +
      " department " +
      data.get("department") +
      " visitorCount " +
      data.get("visitorCount")
  );
}

export function AddStaffFormEditedStaffLog(state) {
  console.log(
    " AddStaffForm This new Edited Staff " +
      state.editStaff.id +
      " name " +
      state.editStaff.name +
      " dept  " +
      state.editStaff.department +
      " vc  " +
      state.editStaff.visitorCount +
      "  bool  " +
      state.isEditing
  );
}
