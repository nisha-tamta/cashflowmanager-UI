import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../css/AddExpense.css";

const EmployeeAdd = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [employee, setEmployee] = useState({
        name: "",
        emailAddress: "",
        phoneNumber: "",
        departmentIdInt: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const [notification, setNotification] = useState({ message: "", visible: false });

    const handleSubmit = () => {
        fetch("http://192.168.29.40:8080/api/employee/create", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(errorText => {
                        throw new Error(errorText || "Error during employee creation");
                    });
                }
            })
            .then((data) => {
                setNotification({ message: 'Employee added!', visible: true });
                navigate("/employees", { state: { message: 'Employee added!' } });
            })
            .catch((error) => {
                console.error("Error during employee creation: ", error);
                setError(error.message);
            });
    };

    const handleCancel = () => {
        navigate("/employees");
    };

    return (
        <div className="container">
            <NavBar />
            <div className="homescreen-container">
                <div className="content-profile-container">
                    {notification.visible &&
                        <div className="notification-message alert-success">
                            {notification.message}
                            <span className="close-button" onClick={() => setNotification({ ...notification, visible: false })}>
                                <FontAwesomeIcon icon={faTimes} style={{ color: 'green' }} />
                            </span>
                        </div>
                    }
                    <div className="content-header">
                        <h1>Add Employee</h1>
                        <div className="create-chat-body">
                            <div >
                                <form>
                                    {<div className="error-message">{error}</div>}
                                    <div className="create-chat-input-container">
                                        <label >Department</label>
                                        <select
                                            className="create-chat-input"
                                            name="departmentIdInt"
                                            value={employee.departmentIdInt}
                                            onChange={handleChange}
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
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            className="create-chat-input"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={employee.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="emailAddress">Email</label>
                                        <input
                                            className="create-chat-input"
                                            type="text"
                                            id="emailAddress"
                                            name="emailAddress"
                                            value={employee.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="phoneNumber">Phone number</label>
                                        <input
                                            className="create-chat-input"
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={employee.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form >
                                <div className="create-chat-button-containers">
                                    <button onClick={handleSubmit} className="create-chat-button" >
                                        Create Employee
                                    </button>
                                    <span className="button-spacing"></span>
                                    <button onClick={handleCancel} type="submit" className="cancel-button">
                                        Back
                                    </button>
                                </div>
                            </div >
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAdd;
