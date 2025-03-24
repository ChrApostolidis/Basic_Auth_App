import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Home from "./Home";
import Toggle from "../components/Toggle";
import Header from "../components/Header";
import { validateLogin } from "../util/validation";

export default function Login() {
  const { authUser, login, logout, setError, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoad(true);


    // Initial validation before calling Firebase
    const { isValid, error } = validateLogin(email, password);
    if (!isValid) {
      setError(error);
     
      setLoad(false);
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);

      const firebaseValidation = validateLogin(email, password, error.code);
      setError(firebaseValidation.error);
      console.log(firebaseValidation.error);

     
    } finally {
      setEmail("");
      setPassword("");
      setLoad(false);
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
          <div className="form-container">
            <form onSubmit={handleLogin}>
              <h2 className="form-header">Login</h2>
              <div className="form-main-container">
                <div className="input-container">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // className={emailError ? "input-error" : ""}
                  />
                </div>
                <div className="input-container">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // className={passwordError ? "input-error" : ""}
                  />
                </div>
                <div className="go-login">
                  <Link to="/register" onClick={() => setError("")}>Don't have an account?</Link>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="container-submit">
                {load ? (
                  <button className="button">Logging in</button>
                ) : (
                  <button className="button">Login</button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
