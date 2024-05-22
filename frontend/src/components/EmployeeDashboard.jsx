import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import api from "./Instances/api";
import EmployeeDataComp from "./EmployeeDataComp";
import { InputField } from "./reuse/InputField";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [search, setSearch] = useState("");

  axios.defaults.withCredentials = true;
  console.log("something");
  const getEmployees = async () => {
    const response = await axios.get(
      "https://employee-dashboard-backend-iota.vercel.app/api/v1/employee/get-employees"
    );
    const employeeData = await response.data.data;
    console.log(employeeData);
    setEmployee(employeeData);
    setHasData(true);
  };

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <>
      <h1>Employee Dashboard</h1>

      {/* {employee.map((employee1, index) => {
        return <p key={index}>{employee1.name}</p>;
      })} */}

      <div className="employeeTable">
        {hasData && (
          <>
            <label htmlFor="searchEmployee" style={{ color: "white" }}>
              Search
            </label>
            <input
            className="searchInput"
              type="text"
              id="searchEmployee"
              placeholder="Search employees"
              onChange={(e) => {
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000);
              }}
            />
            <table id="table">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
                {employee
                  .filter(
                    (data) =>
                      data.uniqueId.startsWith(search, 0) ||
                      data.name.toLowerCase().startsWith(search, 0) ||
                      data.email.toLowerCase().startsWith(search, 0) ||
                      data.mobileNo.toString().startsWith(search, 0)
                  )
                  .map((currentEmployee, index) => {
                    return (
                      <EmployeeDataComp
                        getEmployees={getEmployees}
                        key={index}
                        id={currentEmployee._id}
                        uniqueId={currentEmployee.uniqueId}
                        image={currentEmployee.image}
                        name={currentEmployee.name}
                        mobileNo={currentEmployee.mobileNo}
                        gender={currentEmployee.gender}
                        email={currentEmployee.email}
                        designation={currentEmployee.designation}
                        course={currentEmployee.course}
                      />
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="loading">{!hasData && <p>Loading...</p>}</div>
    </>
  );
}

export default EmployeeDashboard;
