import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./assets/editprofile.css";

export default function EditProfile({ myJwt }) {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getValues = async (e) => {
    try {
      await axios
        .get("https://emil-backend.popetsmaster.com/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + myJwt,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          let id = response.data.id;
          let email = response.data.email;
          let imageName = response.data.imageName;
          request(id, email, imageName);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const request = (id, email, imageName) => {
    const user = { name, email, password, phoneNumber, imageName };
    try {
      axios.put("https://emil-backend.popetsmaster.com/users/" + id, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myJwt,
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="wrapper-edit">
      <div className="register">
        <form action="#">
          <div className="reg">
            <h2>Edit Profile</h2>
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
              defaultValue="Edit Now"
              onClick={getValues}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
