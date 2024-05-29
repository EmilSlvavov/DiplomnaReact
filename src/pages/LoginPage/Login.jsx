import * as React from "react";
import { useState } from "react";
import "./assets/login.css";
import { LoginContext } from "../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login({ setJwt }) {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    const user = { username, password };
    try {
      await axios
        .post("https://emil-backend.popetsmaster.com/authenticate", user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          setJwt(response.data.jwt);
        });
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      alert("Wrong Credantials");
    }
  };

  return (
    <div className="wrapper">
      <div className="login">
        <form action="#">
          <h2>Login</h2>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-box button">
            <input
              id="log-button"
              type="button"
              defaultValue="Login Now"
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
