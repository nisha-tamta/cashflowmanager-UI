import React, { useState, useEffect, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import NavBar from "./NavBar";
import "../css/NavBar.css";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const [showBasicInfoEdit, setShowBasicInfoEdit] = useState(false);

  const handleBasicInfo = () => {
    setShowBasicInfoEdit(true);
  };

  const BasicInfoEdit = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-overlay-profile">
        <div className="confirmation-dialog-profile">
          <div className="create-chat-container">
            <div className="create-chat-header">
              <h2>Edit Basic Information</h2>
            </div>
            <div className="create-chat-body-profile">
              <div >
                <form>
                  {error && <div className="error-message">{error}</div>}
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">First Name</label>
                    <input
                      className="item-value"
                      type="text"
                      id="firstName"
                      value={user.firstName}
                      onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">Last Name</label>
                    <input
                      className="item-value"
                      type="text"
                      id="lastName"
                      value={user.lastName}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">Username</label>
                    <input
                      className="item-value"
                      type="text"
                      id="username"
                      value={user.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-button-containers">
                    <button className="login-chat-button" onClick={onConfirm}>Save</button>
                    <span className="button-spacing"></span>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                  </div>
                </form >
              </div >
            </div >
          </div >
        </div>
      </div>
    );
  };

  const handleBasicInfoEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        const errorMessage = `Failed to save user: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error during saving user: ${error.message}`);
    }
    setShowBasicInfoEdit(false);
  }

  const handleCancelBasicInfoEdit = () => {
    setShowBasicInfoEdit(false);
    window.location.href = '/profile';
  };

  // Below code for Edit Contact Info

  const [showContactInfoEdit, setShowContactInfoEdit] = useState(false);

  const handleContactInfo = () => {
    setShowContactInfoEdit(true);
  };

  const ContactInfoEdit = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-overlay-profile">
        <div className="confirmation-dialog-profile">
          <div className="create-chat-container">
            <div className="create-chat-header">
              <h2>Edit Contact Information</h2>
            </div>
            <div className="create-chat-body-profile">
              <div >
                <form>
                  {error && <div className="error-message">{error}</div>}
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">Phone number</label>
                    <input
                      className="item-value"
                      type="text"
                      id="phoneNumber"
                      value={user.phoneNumber}
                      onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">Email Address</label>
                    <input
                      className="item-value"
                      type="email"
                      id="emailAddress"
                      value={user.emailAddress}
                      onChange={(e) => setUser({ ...user, emailAddress: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-button-containers">
                    <button className="login-chat-button" onClick={onConfirm}>Save</button>
                    <span className="button-spacing"></span>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                  </div>
                </form >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleContactInfoEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        const errorMessage = `Failed to save user: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error during saving user: ${error.message}`);
    }
    setShowContactInfoEdit(false);
  }

  const handleCancelContactInfoEdit = () => {
    setShowContactInfoEdit(false);
    window.location.href = '/profile';
  };

  // Below code for Account Settings

  const [showAccountSettingsEdit, setShowAccountSettingsEdit] = useState(false);

  const handleAccountSettings = () => {
    setShowAccountSettingsEdit(true);
  };

  const AccountSettingsEdit = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-overlay-profile">
        <div className="confirmation-dialog-profile">
          <div className="create-chat-container">
            <div className="create-chat-header">
              <h2>Edit Account Settings</h2>
            </div>
            <div className="create-chat-body-profile">
              <div >
                <form>
                  {error && <div className="error-message">{error}</div>}
                  <div className="create-chat-input-container">
                    <label className="item-label" htmlFor="firstName">Default Budget</label>
                    <input
                      className="item-value"
                      type="text"
                      id="defaultBudget"
                      value={user.defaultBudget}
                      onChange={(e) => setUser({ ...user, defaultBudget: e.target.value })}
                    />
                  </div>
                  <div className="create-chat-button-containers">
                    <button className="login-chat-button" onClick={onConfirm}>Save</button>
                    <span className="button-spacing"></span>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                  </div>
                </form >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAccountSettingsEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/create`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        const errorMessage = `Failed to save user: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error during saving user: ${error.message}`);
    }
    setShowAccountSettingsEdit(false);
  }

  const handleCancelAccountSettingsEdit = () => {
    setShowAccountSettingsEdit(false);
    window.location.href = '/profile';
  };

  // Below code for Reset Password

  const [showResetPasswordEdit, setShowResetPasswordEdit] = useState(false);

  const handleResetPassword = () => {
    setShowResetPasswordEdit(true);
  };

  const ResetPasswordEdit = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-overlay-profile">
        <div className="confirmation-dialog-profile">
          <h2>Reset Password</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="confirmation-buttons-profile">
            <div className="password-reset-form">
              <div>
                <label>Old Password:</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button className="login-chat-button" onClick={onConfirm}>Save</button>
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const handleResetPasswordEdit = async () => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    try {
      await fetch("http://localhost:8080/api/user/resetPassword", {
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
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
    setShowResetPasswordEdit(false);
  };

  const handleCancelResetPasswordEdit = () => {
    setShowResetPasswordEdit(false);
    window.location.href = '/profile';
  };

  return (
    <div className="homescreen-container">
      <NavBar />
      <div className="content-container">
        <div className="content-header">
          <h1>My Account</h1>
          <h6>Info about you and your preferences across Expense Tracker</h6>
        </div>
        <div>
          <div className="content-chat-container">
            {error && <div className="error-message">{error}</div>}
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
                            onConfirm={handleBasicInfoEdit}
                            onCancel={handleCancelBasicInfoEdit}
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
                            onConfirm={handleContactInfoEdit}
                            onCancel={handleCancelContactInfoEdit}
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
                              onConfirm={handleAccountSettingsEdit}
                              onCancel={handleCancelAccountSettingsEdit}
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
                  <div className="profile-section">
                    <button onClick={handleResetPassword} className="reset-password-button" >Reset Password</button>
                    {showResetPasswordEdit && (
                      <ResetPasswordEdit
                        onConfirm={handleResetPasswordEdit}
                        onCancel={handleCancelResetPasswordEdit}
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
  );
};

export default Profile;
