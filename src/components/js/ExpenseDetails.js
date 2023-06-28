import React, { useState, useEffect, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../css/NavBar.css";
import "../css/Profile.css";

const DeleteExpenseEdit = ({ onConfirm, onCancel, error }) => {
    return (
        <div className="confirmation-overlay-profile">
            <div className="confirmation-dialog-profile">
                <div className="create-chat-container">
                    <div className="create-chat-header">
                        <h2>Are you sure you want to delete this expense?</h2>
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
            </div >
        </div >
    );
};

const ExpenseDetails = () => {
    const { expenseId } = useParams();

    const [expense, setExpense] = useState(null);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState(expense);
    const [showBasicInfoEdit, setShowBasicInfoEdit] = useState(false);

    const [showDeleteExpenseEdit, setShowDeleteExpenseEdit] = useState(false);
    const [notification, setNotification] = useState({ message: "", visible: false });

    useEffect(() => {
        if (expenseId) {
            const fetchExpense = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/expenses/${expenseId}`
                    ); // Use expenseId in the API endpoint
                    if (response.ok) {
                        const data = await response.json();
                        setExpense(data);
                    } else {
                        const errorMessage = `Failed to fetch expense: ${response.status} - ${response.statusText}`;
                        setError(errorMessage);
                    }
                } catch (error) {
                    setError(`Error during fetching expense: ${error.message}`);
                }
            };
            fetchExpense();
        }
    }, []);

    const handleDeleteExpense = () => {
        setShowDeleteExpenseEdit(true);
    };

    const handleDeleteExpenseEdit = async (e) => {
        e.preventDefault();

        const userId = JSON.parse(localStorage.getItem("user")).id;
        try {
            const response = await fetch(
                `http://localhost:8080/api/expenses/${expenseId}?userId=${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setError(null);
                setShowDeleteExpenseEdit(false);
                setNotification({ message: 'Expense delete successful!', visible: true });
            } else {
                return response.text().then(errorText => {
                    setError(errorText || "Error during delete expense");
                });
            }
        } catch (error) {
            setError(error.message);
        }
        window.location.href = '/expenses';
    };

    const handleCancelDeleteExpenseEdit = () => {
        setError(null);
        setShowDeleteExpenseEdit(false);
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
                        <h1>Expense Details</h1>
                    </div>
                    <div>
                        <div className="content-chat-container">
                            <div className="content-body">
                                {expense ? (
                                    <div className="profile-sections">
                                        <div className="profile-section">
                                            <div className="info-box">
                                                <div className="info-header">
                                                    <h2>{expense.description}</h2>
                                                    <button className="edit-profile-button">
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </button>
                                                </div>
                                                <div className="profile-details">
                                                    <div className="profile-info">
                                                        <div className="tab-list account-info-list">
                                                            <div>
                                                                <span className="account-info-item">Date:</span>
                                                                <span className="account-info">{expense.date}</span>
                                                            </div>
                                                            <div>
                                                                <span className="account-info-item">Category:</span>
                                                                <span className="account-info">{expense.category}</span>
                                                            </div>
                                                            {expense.category === 'Personnel Costs' && (
                                                                <div>
                                                                    <span className="account-info-item">Employee:</span>
                                                                    <span className="account-info">{expense.employee.name}</span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="account-info-item">Amount:</span>
                                                                <span className="account-info">{expense.amount}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={handleDeleteExpense} className="add-expense-button" >Delete Expense</button>
                                            {showDeleteExpenseEdit && (
                                                <DeleteExpenseEdit
                                                    onConfirm={handleDeleteExpenseEdit}
                                                    onCancel={handleCancelDeleteExpenseEdit}
                                                    error={error}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <h2>Loading...</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
};

export default ExpenseDetails;
