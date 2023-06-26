import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import "../css/UserManagement.css";

const Employees = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    // Fetch the list of Employees from the server
    const fetchData = async () => {
      const employeesData = await getEmployees();
      setEmployees(employeesData);
    };
    fetchData();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee/all");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Error during getting Employees");
      }
    } catch (error) {
      console.error("Error during getting Employees: ", error);
      return [];
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
  };

  const handleSaveEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/edit/${editEmployee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editEmployee),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employee edited successfully: ", data);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Error during Employee editing");
      }
    } catch (error) {
      console.error("Error during Employee editing: ", error);
      setError(error.message);
    }

    // Clear the editEmployee state and update the Employee list
    setEditEmployee(null);
    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = async (employee) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/employee/delete/${employee.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Employee deleted successfully: ");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Error during Employee deletion");
      }
    } catch (error) {
      console.error("Error during Employee deletion: ", error);
      setError(error.message);
    }

    // Clear the deleteEmployee state and update the Employee list
    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  };

  const handleAddAccount = () => {
    navigate("/employees/add");
  };

  const handleEmployeeNameChange = (event) => {
    const updatedEmployee = { ...editEmployee, name: event.target.value };
    setEditEmployee(updatedEmployee);
  };

  const handleEmployeeEmailChange = (event) => {
    const updatedEmployee = { ...editEmployee, emailAddress: event.target.value };
    setEditEmployee(updatedEmployee);
  };

  const handleEmployeePhoneNumberChange = (event) => {
    const updatedEmployee = { ...editEmployee, phoneNumber: event.target.value };
    setEditEmployee(updatedEmployee);
  };

  const handleEmployeeDepartmentChange = (event) => {
    const departmentId = event.target.value;
    const departmentName = event.target.options[event.target.selectedIndex].text;
    const updatedEmployee = { ...editEmployee, department: { id: departmentId, name: departmentName } };
    setEditEmployee(updatedEmployee);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-user-mngmnt-container">
          <div className="content-header">
            <h1>Employees</h1>
            <h6>Info about the Employees</h6>
          </div>
          <div className="content-header">
            <div className="buttons-container">
              <button onClick={handleAddAccount} className="add-expense-button">
                Add Employee
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {/* Employee List */}
          <table className="table-expense">
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black", padding: "8px" }}>Employee Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Department</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} style={{ border: "1px solid black" }}>
                  <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                    {editEmployee && editEmployee.id === employee.id ? (
                      <input
                        className="item-value-expense-edit"
                        type="text"
                        value={editEmployee.name}
                        onChange={handleEmployeeNameChange}
                      />
                    ) : (
                      employee.name
                    )}
                  </td>
                  <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                    {editEmployee && editEmployee.id === employee.id ? (
                      <input
                        className="item-value-expense-edit"
                        type="text"
                        value={editEmployee.emailAddress}
                        onChange={handleEmployeeEmailChange}
                      />
                    ) : (
                      employee.emailAddress
                    )}
                  </td>
                  <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                    {editEmployee && editEmployee.id === employee.id ? (
                      <input
                        className="item-value-expense-edit"
                        type="number"
                        value={editEmployee.phoneNumber}
                        onChange={handleEmployeePhoneNumberChange}
                      />
                    ) : (
                      employee.phoneNumber
                    )}
                  </td>
                  <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                    {editEmployee && editEmployee.id === employee.id ? (
                      <select
                        className="item-value-expense-edit"
                        name="departmentidint"
                        value={editEmployee.department.id}
                        onChange={handleEmployeeDepartmentChange}
                      >
                        <option className="item-value-expense" value="1">
                          Management
                        </option>
                        <option className="item-value-expense" value="2">
                          Operations
                        </option>
                      </select>
                    ) : (
                      employee.department.name
                    )}
                  </td>
                  <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
                    {editEmployee && editEmployee.id === employee.id ? (
                      <>
                        <button className="button-expense-edit-save" onClick={handleSaveEmployee}>
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <span className="button-spacing"></span>
                        <button
                          className="button-expense-edit-cancel"
                          onClick={() => setEditEmployee(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button-edit-expense"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <span className="button-spacing"></span>
                        <button
                          className="button-delete-expense"
                          onClick={() => handleDeleteEmployee(employee)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
