import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { theme } = useAuth();
  return (
    <div className="header">
      <h1 className={theme=== "dark" ? "typing-glitch" : "boring-header" }>{theme === "dark" ? "Welcome to the Matrix..." : "Welcome boring guy..."}</h1>
    </div>
  );
}
