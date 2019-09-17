import React from "react";

//({ courses, onDeleteClick })  is getting the props.courses and props.onDeleteClick in shorthand basically just taking the curly braces and names and putting it in the props.

//=> ( means I don't need to use the return key word because its all wrapped in a () then its automatically returned
const StaffList = ({ staff, handleAdd, handleEdit, handleDelete }) => (
  <table className="table table-striped">
    <thead className="thead-light">
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>
          <button className="btn-info btn-sm" onClick={handleAdd}>
            Add user
          </button>
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      {staff.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>
              <button
                className="btn btn-info btn-sm"
                onClick={() => handleEdit(item.id)}>
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default StaffList;
