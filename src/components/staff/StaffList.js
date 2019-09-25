import React from "react";
import FlipMove from "react-flip-move";
const StaffList = ({ staff, handleAdd, handleEdit, handleDelete }) => (
  <table className=" data-table">
    <thead >
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>
          <button className="buttonSubmit btn-info btn-sm" onClick={handleAdd}>
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
              <td >{item.department}</td>
              <td >
                <button
                  className="button btn btn-info btn-sm"
                  onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
              </td>
              <td >
                <button
                  className="button btn btn-danger btn-sm"
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
