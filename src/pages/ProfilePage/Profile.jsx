import * as React from "react";
import Button from "@mui/material/Button";
import "./assets/profile.css";
import { useNavigate } from "react-router";
import { LoginContext, IsAdminContext } from "../../Context";
import { useContext } from "react";
import default_pfp from "./assets/default_pfp.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Profile({ myJwt, setJwt }) {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [image, setImage] = useState(null);
  const [addingImage, setAddingImage] = useState("");

  const handleClick = async (e) => {
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
          deleteRequest(id);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
          setName(response.data.name);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          getImage(response.data.imageName);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
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
          addImage(response.data.id);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const addImage = async (id) => {
    const formData = new FormData();
    formData.append("file", addingImage);
    axios.post(
      "https://emil-backend.popetsmaster.com/images/users/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleAddingImage = (e) => {
    setAddingImage(e.target.files[0]);
  };

  const getImage = async (imageName) => {
    axios
      .get("https://emil-backend.popetsmaster.com/images/" + imageName, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setImage(url);
      });
  };

  useEffect(() => {
    const handleValueChange = () => {
      getValues();
    };

    handleValueChange();
  }, [image]);

  const deleteRequest = (id) => {
    try {
      axios.delete("https://emil-backend.popetsmaster.com/users/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myJwt,
        },
        withCredentials: true,
      });
      navigate("/");
      setLoggedIn(false);
      setIsAdmin(false);
    } catch (err) {}
  };

  return (
    <div className="wrapper">
      {image === null ? (
        <img className="pfp" src={default_pfp} />
      ) : (
        <img className="pfp" src={image} />
      )}
      <div className="details">
        <p className="info">
          Name: {name}
          <br />
        </p>
        <p className="info">
          Email: {email}
          <br />
        </p>
        <p className="info">
          Phone Number: {phoneNumber}
          <br />
        </p>
        <Button
          style={{
            position: "absolute",
            backgroundColor: "#a393eb",
            color: "white",
            top: 5,
            right: 5,
          }}
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          Edit
        </Button>
        <Button
          style={{
            position: "absolute",
            backgroundColor: "#a393eb",
            color: "white",
            top: 60,
            right: 5,
          }}
          onClick={() => {
            handleClick();
          }}
        >
          Delete Account
        </Button>
        <Button
          style={{
            position: "absolute",
            backgroundColor: "#a393eb",
            color: "white",
            top: 115,
            right: 5,
          }}
          onClick={() => {
            setJwt("");
            navigate("/");
            setLoggedIn(false);
            setIsAdmin(false);
          }}
        >
          Logout
        </Button>
        <Button
          style={{
            position: "absolute",
            backgroundColor: "#a393eb",
            color: "white",
            top: 170,
            right: 5,
          }}
          onClick={() => {
            navigate("/addproperty");
          }}
        >
          Add Property
        </Button>
        <div className="post-images">
          <input
            id="button-for-images-profile"
            type="file"
            onChange={handleAddingImage}
          />
          <label htmlFor="button-for-images-profile">ADD PROFILE IMAGE</label>
        </div>
        <Button
          style={{
            position: "absolute",
            backgroundColor: "#a393eb",
            color: "white",
            top: 280,
            right: 5,
          }}
          onClick={() => {
            handleImage();
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
