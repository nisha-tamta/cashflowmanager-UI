import React, { useState, useEffect, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";
import "../css/NavBar.css";
import "../css/Profile.css";

const BasicInfoEdit = ({ formState, setFormState, onConfirm, onCancel, error }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Edit Basic Information</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="firstName">First Name</label1>
                  <input
                    className="item-value"
                    type="text"
                    id="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="lastName">Last Name</label1>
                  <input
                    className="item-value"
                    type="text"
                    id="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="username">Username</label1>
                  <input
                    className="item-value"
                    type="text"
                    id="username"
                    value={formState.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-button-containers">
                  <button type="submit" className="login-chat-button" onClick={onConfirm}>Save</button>
                  <span className="button-spacing"></span>
                  <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoEdit = ({ formState, setFormState, onConfirm, onCancel, error }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Edit Contact Information</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="firstName">Phone number</label1>
                  <input
                    className="item-value"
                    type="text"
                    id="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="firstName">Email Address</label1>
                  <input
                    className="item-value"
                    type="email"
                    id="emailAddress"
                    value={formState.emailAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-button-containers">
                  <button type="submit" className="login-chat-button" onClick={onConfirm}>Save</button>
                  <span className="button-spacing"></span>
                  <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountSettingsEdit = ({ formState, setFormState, onConfirm, onCancel, error }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Edit Account Settings</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label1 className="item-label" htmlFor="firstName">Default Budget</label1>
                  <input
                    className="item-value"
                    type="number"
                    id="defaultBudget"
                    value={formState.defaultBudget}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-button-containers">
                  <button className="login-chat-button" onClick={onConfirm}>Save</button>
                  <span className="button-spacing"></span>
                  <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordEdit = ({ oldPassword, newPassword, confirmPassword, setOldPassword, setNewPassword, setConfirmPassword, onConfirm, onCancel, error }) => {
  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Reset Password</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form onSubmit={onConfirm}>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">Old Password:</label>
                  <input
                    className="item-value"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">New Password:</label>
                  <input
                    className="item-value"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label2 className="item-label" htmlFor="firstName">Confirm New Password:</label2>
                  <input
                    className="item-value"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="create-chat-button-containers">
                  <button type="submit" className="login-chat-button" onClick={onConfirm}>Save</button>
                  <span className="button-spacing"></span>
                  <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState(user);
  const [showBasicInfoEdit, setShowBasicInfoEdit] = useState(false);
  const [showContactInfoEdit, setShowContactInfoEdit] = useState(false);
  const [showAccountSettingsEdit, setShowAccountSettingsEdit] = useState(false);

  const [showResetPasswordEdit, setShowResetPasswordEdit] = useState(false);
  const [notification, setNotification] = useState({ message: "", visible: false });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/user/${userId}`
          ); // Use userId in the API endpoint
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            const errorMessage = `Failed to fetch user: ${response.status} - ${response.statusText}`;
            setError(errorMessage);
          }
        } catch (error) {
          setError(`Error during fetching user: ${error.message}`);
        }
      };
      fetchUser();
    }
  }, []);

  const handleBasicInfo = () => {
    setFormState(user);
    setShowBasicInfoEdit(true);
  };

  const handleBasicInfoEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setFormState({
          firstName: "",
          lastName: "",
          username: "",
        });
        setError(null);
        setShowBasicInfoEdit(false);
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during editing user");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelBasicInfoEdit = () => {
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
    });
    setError(null);
    setShowBasicInfoEdit(false);
  };

  const handleContactInfo = () => {
    setFormState(user);
    setShowContactInfoEdit(true);
  };

  const handleContactInfoEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setFormState({
          phoneNumber: "",
          emailAddress: ""
        });
        setError(null);
        setShowContactInfoEdit(false);
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during editing user");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleCancelContactInfoEdit = () => {
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
    });
    setError(null);
    setShowContactInfoEdit(false);
  };

  const handleAccountSettings = () => {
    setFormState(user);
    setShowAccountSettingsEdit(true);
  };

  const handleAccountSettingsEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setFormState({
          defaultBudget: ""
        });
        setError(null);
        setShowAccountSettingsEdit(false);
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during editing user");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleCancelAccountSettingsEdit = () => {
    setFormState({
      defaultBudget: ""
    });
    setError(null);
    setShowAccountSettingsEdit(false);
  };

  const handleResetPassword = () => {
    setOldPassword("");
    setNewPassword("");
    setShowResetPasswordEdit(true);
  };

  const handleResetPasswordEdit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must be the same");
      return;
    }
    const username = JSON.parse(localStorage.getItem("user")).username;
    try {
      const response = await fetch("http://localhost:8080/api/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });
      if (response.ok) {
        setError(null);
        setOldPassword("");
        setNewPassword("");
        setShowResetPasswordEdit(false);
        setNotification({ message: 'Password reset successful!', visible: true });
      } else {
        return response.text().then(errorText => {
          setError(errorText || "Error during reset password");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelResetPasswordEdit = () => {
    setError(null);
    setShowResetPasswordEdit(false);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleLogoutConfirmation = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const LogoutConfirmation = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-overlay">
        <div className="confirmation-dialog">
          <div className="create-chat-header">
            <div className="create-chat-header">
              <h2>Are you sure you want to logout?</h2>
            </div>
          </div>
          <div className="confirmation-buttons">
            <div className="create-chat-button-containers">
              <button className="logout-button" onClick={onConfirm}>Logout</button>
              <span className="button-spacing"></span>
              <button type="submit" className="login-chat-button" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
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
            <h1>My Account</h1>
            <h6>Info about you and your preferences across Expense Tracker</h6>
          </div>
          <div>
            <div className="content-chat-container">
              <div className="content-body">
                {user ? (
                  <div className="profile-sections">
                    <div className="profile-section">
                      <div className="info-box">
                        <div className="info-header">
                          <h2>Basic info</h2>
                          <button onClick={handleBasicInfo} className="edit-profile-button">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </button>
                          {showBasicInfoEdit && (
                            <BasicInfoEdit
                              formState={formState}
                              setFormState={setFormState}
                              onConfirm={handleBasicInfoEdit}
                              onCancel={handleCancelBasicInfoEdit}
                              error={error}
                            />
                          )}
                        </div>
                        <div className="profile-details">
                          <div className="profile-info">
                            <div className="tab-list account-info-list">
                              <div>
                                <span className="account-info-item">Name:</span>
                                <span className="account-info">{user.firstName} {user.lastName}</span>
                              </div>
                              <div>
                                <span className="account-info-item">Username:</span>
                                <span className="account-info">{user.username}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-section">
                      <div className="info-box">
                        <div className="info-header">
                          <h2>Contact info</h2>
                          <button onClick={handleContactInfo} className="edit-profile-button" >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </button>
                          {showContactInfoEdit && (
                            <ContactInfoEdit
                              formState={formState}
                              setFormState={setFormState}
                              onConfirm={handleContactInfoEdit}
                              onCancel={handleCancelContactInfoEdit}
                              error={error}
                            />
                          )}
                        </div>
                        <div className="profile-details">
                          <div className="profile-info">
                            <div className="tab-list account-info-list">
                              <div>
                                <span className="account-info-item">Phone:</span>
                                <span className="account-info">{user.phoneNumber}</span>
                              </div>
                              <div>
                                <span className="account-info-item">Email:</span>
                                <span className="account-info">{user.emailAddress}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-section">
                      <div className="info-box">
                        <div className="info-header">
                          <h2>Account settings</h2>
                          <div className="account-settings">
                            <button onClick={handleAccountSettings} className="edit-profile-button" >
                              <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            {showAccountSettingsEdit && (
                              <AccountSettingsEdit
                                formState={formState}
                                setFormState={setFormState}
                                onConfirm={handleAccountSettingsEdit}
                                onCancel={handleCancelAccountSettingsEdit}
                                error={error}
                              />
                            )}
                          </div>
                        </div>
                        <div className="profile-details">
                          <div className="profile-info">
                            <div className="tab-list account-info-list">
                              <div>
                                <span className="account-info-item">Default Budget::</span>
                                <span className="account-info">{user.defaultBudget}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={handleResetPassword} className="reset-password-button" >Reset Password</button>
                      {showResetPasswordEdit && (
                        <ResetPasswordEdit
                          oldPassword={oldPassword}
                          newPassword={newPassword}
                          confirmPassword={confirmPassword}
                          setOldPassword={setOldPassword}
                          setNewPassword={setNewPassword}
                          setConfirmPassword={setConfirmPassword}
                          onConfirm={handleResetPasswordEdit}
                          onCancel={handleCancelResetPasswordEdit}
                          error={error}
                        />
                      )}
                    </div>
                    <div className="logout-nav">
                      <button onClick={handleLogout} className="login-chat-logout" >Logout</button>
                      {showConfirmation && (
                        <LogoutConfirmation
                          onConfirm={handleLogoutConfirmation}
                          onCancel={handleCancelLogout}
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

export default Profile;
