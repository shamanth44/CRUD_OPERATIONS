import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "./Instances/api";
import EmployeeDataComp from "./EmployeeDataComp";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState([]);
  const [ hasData, setHasData ] = useState(false)

  axios.defaults.withCredentials = true;

  const getEmployees = async () => {
    const response = await api.get(
      "https://employee-dashboard-backend-delta.vercel.app/api/v1/employee/get-employees"
    );
    const employeeData = await response.data.data;
    console.log(employeeData);
    setEmployee(employeeData);
    setHasData(true)
  };

  useEffect(() => {
    setTimeout(() => {
    getEmployees();
    }, 500);
  }, []);
  return (
    <>
      <h1>Employee Dashboard</h1>

      {/* {employee.map((employee1, index) => {
        return <p key={index}>{employee1.name}</p>;
      })} */}

        <div className="employeeTable">
      {hasData && (
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
      {employee.map((currentEmployee, index) => {
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
    )
  }
            </div>
  <div className="loading">
         {!hasData && <p>Loading...</p>}
  </div>
    </>
  );
}

export default EmployeeDashboard;
