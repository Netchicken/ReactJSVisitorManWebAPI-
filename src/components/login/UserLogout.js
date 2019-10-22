import React, { Component } from "react";
import { editVisitor } from "../../StaffApi";
const UserLogout = ({ allVisitors, handleDelete }) => (
  <table className=" data-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Business</th>
      </tr>
    </thead>
    <tbody>
      {allVisitors.map(item => {
        return (
          <tr key={item.id}>
            <td>
              {item.firstName} {item.lastName}
            </td>
            <td>{item.business}</td>
            <td>
              <button
                className="button btn btn-danger btn-sm"
                onClick={() => editVisitor(item)}>
                Log Out
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default UserLogout;
