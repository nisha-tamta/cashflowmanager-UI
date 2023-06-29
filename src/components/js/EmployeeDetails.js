import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../css/NavBar.css";
import "../css/Profile.css";

const DeleteEmployeeEdit = ({ onConfirm, onCancel, error }) => {
  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Are you sure you want to delete this employee?</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-button-containers">
                  <button type="submit" className="cancel-button" onClick={onConfirm}>Delete</button>
                  <span className="button-spacing"></span>
                  <button className="login-chat-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeDetails = () => {
  const { employeeId } = useParams();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  const [showDeleteEmployeeEdit, setShowDeleteEmployeeEdit] = useState(false);
  const [notification, setNotification] = useState({ message: "", visible: false });

  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);

  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/employee/${employeeId}`
          ); // Use employeeId in the API endpoint
          if (response.ok) {
            const data = await response.json();
            setEmployee(data);
            setEditedEmployee(data);
          } else {
            const errorMessage = `Failed to fetch employee: ${response.status} - ${response.statusText}`;
            setError(errorMessage);
          }
        } catch (error) {
          setError(`Error during fetching employee: ${error.message}`);
        }
      };
      fetchEmployee();
    }
  }, []);

  const handleDeleteEmployee = () => {
    setShowDeleteEmployeeEdit(true);
  };

  const handleDeleteEmployeeEdit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/employee/${employeeId}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setError(null);
        setShowDeleteEmployeeEdit(false);
        setNotification({ message: 'Employee delete successful!', visible: true });
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during delete employee");
        });
      }
    } catch (error) {
      setError(error.message);
    }
    window.location.href = '/employees';
  };

  const handleCancelDeleteEmployeeEdit = () => {
    setError(null);
    setShowDeleteEmployeeEdit(false);
  };

  const handleEditEmployee = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    
    if (name === "departmentidint") {
      setEditedEmployee(prevState => ({ 
        ...prevState, 
        department: {
          ...prevState.department,
          id: value
        }
      }));
    } else {
      setEditedEmployee(prevState => ({ ...prevState, [id]: value }));
    }
  };
  
  const handleSaveEmployee = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await fetch(
        `http://localhost:8080/api/employee/edit/${employeeId}?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployee),
        }
      );
  
      if (response.ok) {
        const updatedEmployee = await response.json();
        setError(null);
        setEmployee(updatedEmployee);
        setEditMode(false);
        setNotification({ message: 'Employee edit successful!', visible: true });
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during edit employee");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleCancelEditEmployee = () => {
    setEditedEmployee(employee);
    setEditMode(false);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="homescreen-container">
        <div className="content-container">
          {notification.visible &&
            <div className="notification-message alert-success">
              {notification.message}
              <span className="close-button" onClick={() => setNotification({ ...notification, visible: false })}>
                <FontAwesomeIcon icon={faTimes} style={{ color: 'green' }} />
              </span>
            </div>
          }
          <div className="content-header">
            <h1>Employee Details</h1>
          </div>
          <div>
            <div className="content-chat-container-expense">
              <div className="content-body">
                {employee ? (
                  <div>
                    <div >
                      <div>
                        <div className="info-header-expense-details">
                          {editMode ? (
                            <input
                              className="info-header-expense-details"
                              type="text"
                              id="description"
                              value={editedEmployee.name}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="description-wrapper">
                              <h2>{employee.name}</h2>
                              {!editMode && (
                                <button className="button-edit-expense" onClick={handleEditEmployee}>
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="profile-details">
                          <div className="profile-info">
                            <div className="tab-list account-info-list">
                              <div>
                                <span className="account-info-item">Email Address:</span>
                                {editMode ? (
                                  <input
                                    className="create-chat-input"
                                    type="text"
                                    id="emailAddress"
                                    value={editedEmployee.emailAddress}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  <span className="account-info">
                                    {employee.emailAddress}
                                  </span>
                                )}
                              </div>
                              <div>
                                <span className="account-info-item">Phone Number:</span>
                                {editMode ? (
                                  <input
                                    className="create-chat-input"
                                    type="number"
                                    id="phoneNumber"
                                    value={editedEmployee.phoneNumber}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  <span className="account-info">{employee.phoneNumber}</span>
                                )}
                              </div>
                              <div>
                                <span className="account-info-item">Department:</span>
                                {editMode ? (
                                  <select
                                    className="create-chat-input"
                                    name="departmentidint"
                                    value={editedEmployee.department.id}
                                    onChange={handleInputChange}
                                  >
                                    <option className="item-value-expense" value="1" title="Responsible for financial management and accounting">Finance Department</option>
                                    <option className="item-value-expense" value="2" title="Handles employee recruitment, benefits, and personnel management">Human Resources (HR) Department</option>
                                    <option className="item-value-expense" value="3" title="Plans and executes marketing strategies and campaigns">Marketing Department</option>
                                    <option className="item-value-expense" value="4" title="Manages day-to-day business operations">Operations Department</option>
                                    <option className="item-value-expense" value="5" title="Focuses on generating sales and meeting revenue targets">Sales Department</option>
                                    <option className="item-value-expense" value="6" title="Handles technology infrastructure and software development">IT Department</option>
                                    <option className="item-value-expense" value="7" title="Manages administrative tasks and office operations">Administration Department</option>
                                    <option className="item-value-expense" value="8" title="Handles legal matters and ensures compliance with laws and regulations">Legal Department</option>
                                    <option className="item-value-expense" value="9" title="Engages in research and development activities to drive innovation">Research and Development (R&D) Department</option>
                                    <option className="item-value-expense" value="10" title="Provides assistance and support to customers">Customer Support Department</option>
                                  </select>
                                ) : (
                                  <span className="account-info">{employee.department.name}</span>
                                )}
                              </div>
                              {/* <div>
                                <span className={editMode ? "account-info-item-blurred" : "account-info-item-blurred"}>Notes...</span>
                                {editMode ? (
                                  <textarea
                                    className="note-display account-info-blurred"
                                    id="notes"
                                    rows="2"
                                    value={editedEmployee.notes}
                                    onChange={handleInputChange}
                                  />
                                ) : (
                                  <div className={editMode ? "account-info" : "note-display account-info-blurred"}>
                                    {employee.notes}
                                  </div>
                                )}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {editMode && (
                      <div>
                        <button className="button-expense-edit-save" onClick={handleSaveEmployee}>
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <span className="button-spacing"></span>
                        <button className="button-expense-edit-cancel" onClick={handleCancelEditEmployee}>
                          Cancel
                        </button>
                      </div>
                    )}
                    <div>
                      <button onClick={handleDeleteEmployee} className="add-expense-button">Delete Employee</button>
                      {showDeleteEmployeeEdit &&
                        <DeleteEmployeeEdit
                          onConfirm={handleDeleteEmployeeEdit}
                          onCancel={handleCancelDeleteEmployeeEdit}
                          error={error}
                        />
                      }
                    </div>
                  </div>
                ) : (
                  <h2>Loading...</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
