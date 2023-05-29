import React, { useState, useEffect, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
              <form>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">First Name</label>
                  <input
                    className="item-value"
                    type="text"
                    id="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="lastName">Last Name</label>
                  <input
                    className="item-value"
                    type="text"
                    id="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="username">Username</label>
                  <input
                    className="item-value"
                    type="text"
                    id="username"
                    value={formState.username}
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
              <form>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">Phone number</label>
                  <input
                    className="item-value"
                    type="text"
                    id="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">Email Address</label>
                  <input
                    className="item-value"
                    type="email"
                    id="emailAddress"
                    value={formState.emailAddress}
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
              <form>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">Default Budget</label>
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

const ResetPasswordEdit = ({ oldPassword, newPassword, setOldPassword, setNewPassword, onConfirm, onCancel, error }) => {
  return (
    <div className="confirmation-overlay-profile">
      <div className="confirmation-dialog-profile">
        <div className="create-chat-container">
          <div className="create-chat-header">
            <h2>Reset Password</h2>
          </div>
          <div className="create-chat-body-profile">
            <div>
              <form>
                {error && <div className="error-message">{error}</div>}
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">Old Password:</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="create-chat-input-container">
                  <label className="item-label" htmlFor="firstName">New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
      </div >
    </div >
  );
};

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState(user);
  const [showBasicInfoEdit, setShowBasicInfoEdit] = useState(false);
  const [showContactInfoEdit, setShowContactInfoEdit] = useState(false);
  const [showAccountSettingsEdit, setShowAccountSettingsEdit] = useState(false);

  const [showResetPasswordEdit, setShowResetPasswordEdit] = useState(false);

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

  const handleBasicInfoEdit = async () => {
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
      } else {
        const errorMessage = `Failed to save user: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error during saving user: ${error.message}`);
    }

    setFormState({
      firstName: "",
      lastName: "",
      username: "",
    });
    setShowBasicInfoEdit(false);
  };

  const handleCancelBasicInfoEdit = () => {
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
    });
    setShowBasicInfoEdit(false);
  };

  const handleContactInfo = () => {
    setFormState(user);
    setShowContactInfoEdit(true);
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
          body: JSON.stringify(formState),
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
    setFormState({
      phoneNumber: "",
      emailAddress: ""
    });
    setShowContactInfoEdit(false);
  }

  const handleCancelContactInfoEdit = () => {
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
    });
    setShowContactInfoEdit(false);
  };

  const handleAccountSettings = () => {
    setFormState(user);
    setShowAccountSettingsEdit(true);
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
          body: JSON.stringify(formState),
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
    setFormState({
      defaultBudget: ""
    });
    setShowAccountSettingsEdit(false);
  }

  const handleCancelAccountSettingsEdit = () => {
    setFormState({
      defaultBudget: ""
    });
    setShowAccountSettingsEdit(false);
  };

  const handleResetPassword = () => {
    setShowResetPasswordEdit(true);
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
                  <div className="profile-section">
                    <button onClick={handleResetPassword} className="reset-password-button" >Reset Password</button>
                    {showResetPasswordEdit && (
                      <ResetPasswordEdit
                        oldPassword={oldPassword}
                        newPassword={newPassword}
                        setOldPassword={setOldPassword}
                        setNewPassword={setNewPassword}
                        onConfirm={handleResetPasswordEdit}
                        onCancel={handleCancelResetPasswordEdit}
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
  );
};

export default Profile;
