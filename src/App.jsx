import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <AppRoutes /> 
    </AuthProvider>
  );
}

function AppRoutes() {
  const { authUser } = useAuth(); 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
