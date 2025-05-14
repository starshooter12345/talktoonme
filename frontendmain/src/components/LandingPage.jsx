import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

// Sample surveys
const surveys = [
  {
    title: "Healthcare Survey",
    description: "Survey on healthcare topics",
    status: "active", // active or coming soon
  },
  {
    title: "Education Survey",
    description: "Survey on education topics",
    status: "coming soon", // active or coming soon
  },
  {
    title: "Technology Survey",
    description: "Survey on technology trends",
    status: "coming soon", // active or coming soon
  },
];

const LandingPage = ({ onStartSurvey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleAuthButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Success:", response);
    // Handle the response and proceed with login/signup
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
  };

  const handleStartSurvey = () => {
    // Call the onStartSurvey function passed from App.jsx
    onStartSurvey();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Talk Toon Me!</div>
        <button className="auth-btn" onClick={handleAuthButtonClick}>
          Login / Sign Up
        </button>
      </header>
      
      <main className="main-content">
        <div className="survey-cards">
          {surveys.map((survey, index) => (
            <div key={index} className="survey-card">
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              {survey.status === "active" ? (
                <button className="survey-btn" onClick={handleStartSurvey}>
                  Start Survey
                </button>
              ) : (
                <button className="survey-btn" disabled>
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Login/Signup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              ✖
            </button>

            {/* Toggle between Login and Signup */}
            {isLoginForm ? (
              <LoginForm onToggleForm={handleToggleForm} />
            ) : (
              <SignupForm onToggleForm={handleToggleForm} />
            )}

            {/* Google Login Button */}
            <div className="google-login-btn">
              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"  // Add your Google client ID here
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy="single_host_origin"
                theme="dark"
                className="google-btn"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoginForm = ({ onToggleForm }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter Password" />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button className="toggle-btn" onClick={onToggleForm}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

const SignupForm = ({ onToggleForm }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter Email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter Password" />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input type="date" />
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button className="toggle-btn" onClick={onToggleForm}>
          Login
        </button>
      </p>
    </div>
  );
};

export default LandingPage;
