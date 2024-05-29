import * as React from "react";
import ListingsWrapper from "../HomePage/assets/ListingsWrapper";
import "./assets/search.css";
import MultipleSelectPlaceholderProperty from "./assets/DropdownTypeProperty";
import MultipleSelectPlaceholderRegion from "./assets/DropdownRegion";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ListingType from "./assets/ListingType";
import axios from "axios";
import ListingsWrapperUsers from "./assets/ListingWrapperUsers";

export default function Search({ myJwt, setPropertyId, setUserId }) {
  const [searchType, setSearchType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [listingType, setListingType] = useState("");
  const [search, setSearch] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [name, setName] = useState("");

  const handlePropertyFilter = async () => {
    setSearch(
      "propertyType:" +
        propertyType +
        "," +
        "city:" +
        city.replace(" ", "_") +
        "," +
        "listingType:" +
        listingType +
        "," +
        "totalPrice>" +
        lowestPrice +
        "," +
        "totalPrice<" +
        highestPrice +
        ","
    );
  };

  const handleUserFilter = async () => {
    setSearchUser(name);
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="radioButton">
            <input
              id="search-type-property"
              type="radio"
              name="search-type"
              value="Property"
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="search-type-property">Property</label>
            <br />
            <input
              id="search-type-user"
              type="radio"
              name="search-type"
              value="User"
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="search-type-user">User</label>
          </div>
          {searchType === "User" && (
            <>
              <div className="input-box-name">
                <input
                  type="text"
                  placeholder="Search for users"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleUserFilter}
                style={{
                  backgroundColor: "#a393eb",
                  color: "white",
                  maxHeight: "52px",
                  minHeight: "52px",
                }}
              >
                Filter
              </Button>
            </>
          )}
          {searchType === "Property" && (
            <>
              <MultipleSelectPlaceholderProperty
                setPropertyType={setPropertyType}
              ></MultipleSelectPlaceholderProperty>
              <MultipleSelectPlaceholderRegion
                setCity={setCity}
              ></MultipleSelectPlaceholderRegion>
              <ListingType setListingType={setListingType}></ListingType>
              <div className="input-box-price">
                <input
                  type="text"
                  placeholder="Lowest Price"
                  value={lowestPrice}
                  onChange={(e) => setLowestPrice(e.target.value)}
                />
              </div>
              <div className="input-box-price">
                <input
                  type="text"
                  placeholder="Highest Price"
                  value={highestPrice}
                  onChange={(e) => setHighestPrice(e.target.value)}
                />
              </div>
              <Button
                onClick={handlePropertyFilter}
                style={{
                  backgroundColor: "#a393eb",
                  color: "white",
                  maxHeight: "52px",
                  minHeight: "52px",
                }}
              >
                Filter
              </Button>
            </>
          )}
        </form>
      </div>
      {searchType === "User" && (
        <ListingsWrapperUsers
          setUserId={setUserId}
          searchUser={searchUser}
        ></ListingsWrapperUsers>
      )}
      {searchType === "Property" && (
        <ListingsWrapper
          setPropertyId={setPropertyId}
          search={search}
        ></ListingsWrapper>
      )}
    </>
  );
}
