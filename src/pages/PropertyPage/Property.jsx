import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import house1 from "./assets/house1.jpg";
import "./assets/property.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { IsAdminContext, LoginContext } from "../../Context";

export default function Property({ myJwt, propertyId }) {
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const [selfId, setSelfId] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [buildType, setBuildType] = useState("");
  const [city, setCity] = useState("");
  const [sqMeters, setSqMeters] = useState("");
  const [pricePerSqMeter, setPricePerSqMeter] = useState("");
  const [floor, setFloor] = useState("");
  const [totalBuildingFloors, setTotalBuildingFloors] = useState("");
  const [act16, setAct16] = useState("");
  const [elevator, setElevetor] = useState("");
  const [furnished, setFurnished] = useState("");
  const [listingType, setListingType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [image, setImage] = useState(null);

  const getUserId = async () => {
    try {
      axios
        .get("https://emil-backend.popetsmaster.com/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + myJwt,
          },
          withCredentials: true,
        })
        .then((response) => {
          setSelfId(response.data.id);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getValues = async () => {
    try {
      axios
        .get("https://emil-backend.popetsmaster.com/properties/" + propertyId, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setAddress(response.data.address);
          setPropertyType(response.data.propertyType);
          setRooms(response.data.rooms);
          setBuildType(response.data.buildType);
          setCity(response.data.city);
          setSqMeters(response.data.sqMeters);
          setPricePerSqMeter(response.data.pricePerSqMeter);
          setFloor(response.data.floor);
          setTotalBuildingFloors(response.data.totalBuildingFloors);
          setAct16(response.data.act16);
          setElevetor(response.data.elevator);
          setFurnished(response.data.furnished);
          setListingType(response.data.listingType);
          getImage(response.data.imageName);

          setOwnerId(response.data.user.id);
          setOwnerName(response.data.user.name);
        });
    } catch (err) {
      console.log(err);
    }
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

  const handleDelete = async () => {
    try {
      axios
        .delete(
          "https://emil-backend.popetsmaster.com/properties/" + propertyId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + myJwt,
            },
            withCredentials: true,
          }
        )
        .then(navigate("/"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getValues();
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      getUserId();
    }
  }, []);

  let navigate = useNavigate();
  return (
    <>
      <div className="property-main">
        <div className="ad">
          <div className="text">
            <p className="info">
              Property type: {propertyType}
              <br />
              Adress: {address}
              <br />
              Region: {city.replace("_", " ")}
              <br />
              Price: {sqMeters * pricePerSqMeter} Bgn
              <br />
            </p>
          </div>

          <img className="image" src={image} alt="Няма снимки" />
        </div>
        <div className="description">
          <div className="data">
            <p className="info">
              Rooms: {rooms} <br />
              Square meters: {sqMeters}
              <br />
              Price per square meter: {pricePerSqMeter}
              <br />
              Floor: {floor}
              <br />
              Total building floors: {totalBuildingFloors}
              <br />
              Act16: {act16.toString().toUpperCase()}
              <br />
              Elevator: {elevator.toString().toUpperCase()}
              <br />
              Furnished: {furnished.toString().toUpperCase()}
              <br />
              Build Type: {buildType}
              <br />
              Listing Type: {listingType} <br />
              Property Owner: {ownerName} <br />
            </p>
            {(isAdmin || selfId === ownerId) && (
              <Button
                color="inherit"
                style={{
                  position: "absolute",
                  backgroundColor: "#a393eb",
                  color: "white",
                  left: 7,
                  bottom: 7,
                }}
                onClick={() => {
                  navigate("/editproperty");
                }}
              >
                Edit property
              </Button>
            )}
            {(isAdmin || selfId === ownerId) && (
              <Button
                color="inherit"
                style={{
                  position: "absolute",
                  backgroundColor: "#a393eb",
                  color: "white",
                  left: 150,
                  bottom: 7,
                }}
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete property
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
