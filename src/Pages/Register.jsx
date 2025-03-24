import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Home from "./Home";
import Toggle from "../components/Toggle";
import Header from "../components/Header";
import { getFirebaseErrorMessage, validateRegister } from "../util/validation";

export default function Register() {
  const { authUser, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const [load, setLoad] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoad(true);
    setErrors({}); 

    const { isValid, errors } = validateRegister(
      email,
      password,
      username,
      confirmPassword
    );

    if (!isValid) {
      setErrors(errors);

      setLoad(false);
      return;
    }

    try {
      await register(email, password, username, confirmPassword);
    } catch (error) {
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        firebase: getFirebaseErrorMessage(error.code),
      }));

    } finally {
      setLoad(false);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <>
      <div className="container">
        <div className="header-container">
          <Header />
          <Toggle />
        </div>
        {authUser ? (
          <Home user={authUser.username} logout={logout} />
        ) : (
          <div className="form-container-register">
            <form onSubmit={handleRegister}>
              <h2 className="form-header">Register</h2>
              <div className="form-main-container">
                <div className="input-container">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>
                <div className="input-container">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter your Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? "input-error" : ""}
                  />
                  {errors.username && (
                    <p className="error-message">{errors.username}</p>
                  )}
                </div>
                <div className="input-container">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>
                <div className="input-container">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Enter your Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? "input-error" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="go-register">
                  <Link to="/login" onClick={() => setErrors("")}>
                    Already a User?
                  </Link>
                </div>
                {errors.fields && (
                  <p className="error-message">{errors.fields}</p>
                )}
              </div>
              {errors.firebase && (
                <p className="error-message">{errors.firebase}</p>
              )}

              <div className="container-submit">
                {load ? (
                  <button className="button">Registering...</button>
                ) : (
                  <button className="button">Register</button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
