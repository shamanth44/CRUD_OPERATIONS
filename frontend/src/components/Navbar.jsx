import React from "react";
import { Link } from "react-router-dom";
import Signout from "./Signout";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>My Dashboard</h1>
      </div>
      <div className="navitemsRight">
        <Link className="dashboard" to={"/dashboard"}>Employee List</Link>
        <Link className="dashboard" to={"/create-employee"}>Create Employee</Link>
        <Signout />
      </div>
    </div>
  );
}

export default Navbar;
