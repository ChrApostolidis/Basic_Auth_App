import { useAuth } from "../context/AuthContext";

export default function Toggle() {
  const {theme, toggleTheme} = useAuth();

  return (
    <>
      <div className="toggle-container">
        <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
      </div>
    </>
  );
}
