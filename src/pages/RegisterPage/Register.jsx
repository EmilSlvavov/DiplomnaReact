import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { LoginContext } from "../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./assets/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    const user = { name, email, password, phoneNumber };
    let resp = axios
      .post("https://emil-backend.popetsmaster.com/users/register", user)
      .then(navigate("/login"));
    console.log(resp.data);
  };

  let navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="register">
        <form action="">
          <div className="reg">
            <h2>Registration</h2>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input-box button">
            <input
              id="reg-button"
              type="button"
              defaultValue="Register Now"
              onClick={handleRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
