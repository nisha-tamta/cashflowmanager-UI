import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import "../css/UserManagement.css";

const UserManagement = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        name: "",
        role: ""
    });
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    useEffect(() => {
        // Fetch the list of users from the server
        const fetchData = async () => {
            const usersData = await getUsers();
            setUsers(usersData);
        };
        fetchData();
    }, []);

    const handleCreateUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/user/create", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User created successfully: ", data);
                navigate("/login");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Error during user creation");
            }
        } catch (error) {
            console.error("Error during user creation: ", error);
            setError(error.message);
        }

        // Reset the form and update the user list
        setNewUser({ username: "", name: "", role: "" });
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    };

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/user/all");
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Error during getting users");
            }
        } catch (error) {
            console.error("Error during getting users: ", error);
            return [];
        }
    };

    return (
        <div className="container">
            <NavBar />
            <div className="homescreen-container">
                <div className="content-container">
                    <div className="content-header">
                        <h1>User Management</h1>
                        <h6>Info about the users</h6>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {/* User List */}
                    <table className="table-expense">
                        <thead>
                            <tr style={{ border: "1px solid black" }}>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Username</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>First Name</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Last Name</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Default Budget</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Role</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ border: "1px solid black" }}>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.username}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.firstName}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.lastName}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.emailAddress}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.phoneNumber}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.defaultBudget}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>{user.role.roleName}</td>
                                    <td className="table-cell" style={{ border: "1px solid black", padding: "8px" }}>
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

export default UserManagement;
