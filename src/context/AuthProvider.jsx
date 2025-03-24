import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import useLocalStorage from "use-local-storage";

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser({
          uid: currentUser.uid,
          email: currentUser.email,
          username: currentUser.displayName,
        });
      } else {
        setAuthUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });


      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: username,
      });

      console.log("User Created", user);
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: user.displayName,
      });

      console.log("Logged in as:", user.displayName);
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  const value = {
    authUser,
    setAuthUser,
    loading,
    setLoading,
    register,
    login,
    logout,
    toggleTheme,
    theme,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
