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

    const handleEditUser = (user) => {
        setEditUser(user);
    };

    const handleSaveUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/edit/${editUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editUser)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User edited successfully: ", data);
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Error during user editing");
            }
        } catch (error) {
            console.error("Error during user editing: ", error);
            setError(error.message);
        }

        // Clear the editUser state and update the user list
        setEditUser(null);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    };

    const handleDeleteUser = async (user) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (user.id === currentUser.id) {
            const confirmed = window.confirm(
                "You are deleting the current user. Are you sure you want to delete and logout?"
            );
            if (!confirmed) {
                return;
            }
        } else {
            const confirmed = window.confirm(
                "Are you sure you want to delete?"
            );
            if (!confirmed) {
                return;
            }
        }
        try {
            const response = await fetch(`http://localhost:8080/api/user/delete/${user.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log("User deleted successfully: ");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Error during user deletion");
            }
        } catch (error) {
            console.error("Error during user deletion: ", error);
            setError(error.message);
        }

        // Clear the deleteUser state and update the user list
        setDeleteUser(null);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        if (user.id === currentUser.id) {
            localStorage.removeItem("user");
            window.location.href = "/";
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
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Username
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    First Name
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Last Name
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Email
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Phone Number
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Default Budget
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Role
                                </th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ border: "1px solid black" }}>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.username}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        username: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.firstName}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        firstName: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.firstName
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.lastName}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        lastName: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.lastName
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.emailAddress}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        emailAddress: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.emailAddress
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.phoneNumber}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        phoneNumber: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.phoneNumber
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.defaultBudget}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        defaultBudget: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.defaultBudget
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <input
                                                className="item-value-expense-edit"
                                                type="text"
                                                value={editUser.role.roleName}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        role: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            user.role.roleName
                                        )}
                                    </td>
                                    <td
                                        className="table-cell"
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {editUser && editUser.id === user.id ? (
                                            <>
                                                <button
                                                    className="button-expense-edit-save"
                                                    onClick={handleSaveUser}
                                                >
                                                    <FontAwesomeIcon icon={faSave} />
                                                </button>
                                                <span className="button-spacing"></span>
                                                <button
                                                    className="button-expense-edit-cancel"
                                                    onClick={() => setEditUser(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="button-edit-expense"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </button>
                                                <span className="button-spacing"></span>
                                                <button
                                                    className="button-delete-expense"
                                                    onClick={() => handleDeleteUser(user)}
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
                    {/* Create User Form */}
                    <h3>Create User</h3>
                    <form onSubmit={handleCreateUser}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={newUser.username}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, username: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="role">Role:</label>
                            <input
                                type="text"
                                id="role"
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, role: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
