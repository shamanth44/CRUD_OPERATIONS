import "./App.css";
import GetSingleEmployee from "./GetSingleEmployee";
import OpenRoute from "./OpenRoute";
import AdminDashboard from "./components/AdminDashboard";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeDashboard from "./components/EmployeeDashboard";
import PrivateRoute from "./components/PrivateRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path="/signin" element={<OpenRoute><Signin /></OpenRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/create-employee" element={<PrivateRoute><CreateEmployee /></PrivateRoute>} />
          <Route path="/edit-employee/:id" element={<PrivateRoute><GetSingleEmployee /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
