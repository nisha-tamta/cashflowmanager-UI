import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../css/AddExpense.css";

const UserManagementAdd = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: "",
        password: "",
        phoneNumber: "",
        defaultBudget: "",
        roleIdInt: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const [notification, setNotification] = useState({ message: "", visible: false });

    const handleSubmit = () => {
        if (user.password !== confirmPassword) {  // Checking if passwords match
            setError("Passwords do not match");
            return;
        }
        fetch("http://192.168.29.40:8080/api/user/create", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(errorText => {
                        throw new Error(errorText || "Error during user creation");
                    });
                }
            })
            .then((data) => {
                setNotification({ message: 'Account added!', visible: true });
                navigate("/userManagement", { state: { message: 'Account added!' } });
            })
            .catch((error) => {
                console.error("Error during user creation: ", error);
                setError(error.message);
            });
    };

    const handleCancel = () => {
        navigate("/userManagement");
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
                        <h1>Add Acccount</h1>
                        <div className="create-chat-body">
                            <div >
                                <form>
                                    {<div className="error-message">{error}</div>}
                                    <div className="create-chat-input-container">
                                        <label >Role</label>
                                        <select
                                            className="create-chat-input"
                                            name="roleIdInt"
                                            value={user.roleIdInt}
                                            onChange={handleChange}
                                        >
                                            <option className="item-value-expense" value="1">Administrator</option>
                                            <option className="item-value-expense" value="2">User</option>
                                        </select>
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            className="create-chat-input"
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            className="create-chat-input"
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={user.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            className="create-chat-input"
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={user.username}
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
                                            value={user.emailAddress}
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
                                            value={user.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            className="create-chat-input"
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="create-chat-input-container">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            className="create-chat-input"
                                            type="password"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                    </div>
                                </form >
                                <div className="create-chat-button-containers">
                                    <button onClick={handleSubmit} className="create-chat-button" >
                                        Create User
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

const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export default UserManagementAdd;
