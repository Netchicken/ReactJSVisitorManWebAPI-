function LogVisitorIN(data) {
  console.log(
    "LogVisitorIN StaffApi " +
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
