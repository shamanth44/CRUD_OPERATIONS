import { useState } from "react";
import axios from "axios";
import { Button } from "./reuse/Button";
import { InputField } from "./reuse/InputField";
import "./css/register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;

  const signup = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(
        "https://employee-dashboard-backend-iota.vercel.app/api/v1/admin/register",
        formData
      );
      navigate("/signin")
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="signup">
          <h1 className="register">Sign up</h1>
          <div className="inputField">
            <InputField
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              type={"text"}
              label={"Name"}
            />
            <InputField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              type={"text"}
              label={"Email"}
            />
            <InputField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              label={"Password"}
              type={"password"}
            />
            <InputField
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              placeholder="Upload picture"
              type={"file"}
              label={"Profile Picture"}
            />
          </div>
          <div className="buttonBox">
            <Button onClick={signup} label={"Sign up"} />
            <p className="label">Already have an account? <Link to={"/signin"} className="sign"> Sign in</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
