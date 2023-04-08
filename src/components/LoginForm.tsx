import React, { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import FirebaseAuthService from "../FirebaseAuthService";
import { AuthError, User } from "firebase/auth";

const LoginForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    return FirebaseAuthService.subscribeToAuthChanges(setUser);
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isEmail(username)) {
      setError("Invalid email");
      return;
    }

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-email"
      ) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleResetPassword = async () => {
    if (!username) {
      setError("Please enter your email");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordReset(username);
      setMessage("Password reset email sent");
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="login-form-container">
      {
        user ? (
          <div className="row">
            <h3>Welcome, {user.email}</h3>
            <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username" className="input-label login-label">
              Username (email):
              <input
                required
                type="email"
                id="username"
                name="username"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-text"
              />
            </label>

            <label htmlFor="password" className="input-label login-label">
              Password:
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-text"
              />
            </label>
            <div className="button-box">
              <button className="primary-button" type="submit">Login</button>
              <button type="button" onClick={handleResetPassword} className="primary-button">Reset Password</button>
            </div>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
          </form>
        )
      }
    </div>
  );
};

export default LoginForm;