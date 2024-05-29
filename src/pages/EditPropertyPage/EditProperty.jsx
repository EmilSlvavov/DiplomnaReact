import * as React from "react";
import MultipleSelectPlaceholderProperty from "../SearchPage/assets/DropdownTypeProperty";
import MultipleSelectBuildPropertyType from "../AddPropertyPage/assets/PropertyBuildTypeDrop";
import MultipleSelectAct16 from "../AddPropertyPage/assets/Act16";
import MultipleSelectElevator from "../AddPropertyPage/assets/Elevator";
import MultipleSelectFurnished from "../AddPropertyPage/assets/Furnished";
import MultipleSelectPlaceholderRegion from "../SearchPage/assets/DropdownRegion";
import MultipleSelectListing from "../AddPropertyPage/assets/Listing";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import TypeProperty from "../AddPropertyPage/assets/TypeProperty";
import MultipleSelectRegion from "../AddPropertyPage/assets/RegionDropdown";

export default function EditProperty({ myJwt, propertyId }) {
  let navigate = useNavigate();
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
  const [image, setImage] = useState("");

  const handleClick = async () => {
    const property = {
      address,
      propertyType,
      rooms,
      buildType,
      city,
      sqMeters,
      pricePerSqMeter,
      floor,
      totalBuildingFloors,
      act16,
      elevator,
      furnished,
      listingType,
    };
    axios
      .put(
        "https://emil-backend.popetsmaster.com/properties/" + propertyId,
        property,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + myJwt,
          },
          withCredentials: true,
        }
      )
      .then((resp) => {
        addImage(resp.data.id), navigate("/profile");
      });
  };

  const addImage = async (id) => {
    const formData = new FormData();
    formData.append("file", image);
    axios
      .post(
        "https://emil-backend.popetsmaster.com/images/properties/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="wrapper-add-property">
      <form action="">
        <h2>Edit Property</h2>
        <div className="input-text">
          <input
            type="text"
            placeholder="Adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <TypeProperty setPropertyType={setPropertyType}></TypeProperty>
        <div className="input-text">
          <input
            type="text"
            placeholder="Number of rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>
        <MultipleSelectBuildPropertyType
          setBuildType={setBuildType}
        ></MultipleSelectBuildPropertyType>
        <MultipleSelectRegion setCity={setCity}></MultipleSelectRegion>
        <div className="input-text" id="sqm">
          <input
            type="text"
            placeholder="Square meters"
            value={sqMeters}
            onChange={(e) => setSqMeters(e.target.value)}
          />
        </div>
        <div className="input-text">
          <input
            type="text"
            placeholder="Price per square meter"
            value={pricePerSqMeter}
            onChange={(e) => setPricePerSqMeter(e.target.value)}
          />
        </div>
        <div className="input-text">
          <input
            type="text"
            placeholder="Floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
        <div className="input-text">
          <input
            type="text"
            placeholder="Total building floors"
            value={totalBuildingFloors}
            onChange={(e) => setTotalBuildingFloors(e.target.value)}
          />
        </div>
        <MultipleSelectAct16 setAct16={setAct16}></MultipleSelectAct16>
        <MultipleSelectElevator
          setElevetor={setElevetor}
        ></MultipleSelectElevator>
        <MultipleSelectFurnished
          setFurnished={setFurnished}
        ></MultipleSelectFurnished>
        <MultipleSelectListing
          setListingType={setListingType}
        ></MultipleSelectListing>
        <div className="images">
          <input id="button-for-images" type="file" onChange={handleImage} />
          <label htmlFor="button-for-images">Add Image</label>
        </div>
        <div className="input-box-add-property">
          <input
            id="add-button"
            type="button"
            defaultValue="Add property"
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
}
