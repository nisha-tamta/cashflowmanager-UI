import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";

const UserManagement = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        // Fetch the list of users from the server
        const fetchData = async () => {
            const usersData = await getUsers();
            setUsers(usersData);
        };
        fetchData();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch("http://192.168.29.40:8080/api/user/all");
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
            const response = await fetch(`http://192.168.29.40:8080/api/user/edit/${editUser.id}`, {
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
            const response = await fetch(`http://192.168.29.40:8080/api/user/delete/${user.id}`, {
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
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        if (user.id === currentUser.id) {
            localStorage.removeItem("user");
            window.location.href = "/";
        }
    };

    const handleAddAccount = () => {
        navigate("/userManagement/add");
    };

    return (
        <div className="container">
            <NavBar />
            <div className="homescreen-container">
                <div className="content-user-mngmnt-container">
                    <div className="content-header">
                        <h1>Account Management</h1>
                        <h6>Info about the Expense Tracker Business accounts</h6>
                    </div>
                    <div className="content-header">
                        <div className="buttons-container">
                            <button
                                onClick={handleAddAccount}
                                className="add-expense-button"
                            >
                                Add Account
                            </button>
                        </div>
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
                                                type="number"
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
                                                type="number"
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
                                            <select
                                                className="item-value-expense-edit"
                                                name="roleIdInt"
                                                value={editUser.role.roleId}
                                                onChange={(e) =>
                                                    setEditUser({
                                                        ...editUser,
                                                        role: {
                                                            roleId: e.target.value,
                                                            roleName: e.target.options[e.target.selectedIndex].text
                                                        }
                                                    })
                                                }
                                            >
                                                <option className="item-value-expense" value="1">Administrator</option>
                                                <option className="item-value-expense" value="2">User</option>
                                            </select>
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
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
