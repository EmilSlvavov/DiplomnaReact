import * as React from "react";
import ActionAreaCard from "./Listings";
import ActionAreaCard2 from "./Listings2";
import ActionAreaCard3 from "./Listings3";
import { Stack, Pagination } from "@mui/material";
import "./customStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListingsWrapper({
  myJwt,
  setPropertyId,
  search,
  lowestPrice,
  highestPrice,
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [id, setId] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [listingType, setListingType] = useState([]);
  const [sqMeters, setSqMeters] = useState([]);
  const [pricePerSqMeter, setPricePerSqMeter] = useState([]);
  const [maxPages, setMaxPages] = useState();
  const [imageName, setImageName] = useState([]);

  const pageChangeHandler = async (event, pageNumber = 1) => {
    setPageNumber(pageNumber - 1);
    setId([]);
    setPropertyType([]);
    setListingType([]);
    setSqMeters([]);
    setPricePerSqMeter([]);
    setImageName([]);
    getProperties(pageNumber - 1);
  };

  const getProperties = async (pageNum = 0) => {
    axios
      .get(
        "https://emil-backend.popetsmaster.com/properties/all?size=3&page=" +
          pageNum +
          "&search=" +
          search,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((resp) => {
        const newIds = resp.data.content.map((element) => element.id);
        setId((prevIds) => [...prevIds, ...newIds]);

        const newPropertyTypes = resp.data.content.map(
          (element) => element.propertyType
        );
        setPropertyType((prevPropertyType) => [
          ...prevPropertyType,
          ...newPropertyTypes,
        ]);

        const newListingTypes = resp.data.content.map(
          (element) => element.listingType
        );
        setListingType((prevListingType) => [
          ...prevListingType,
          ...newListingTypes,
        ]);

        const newSqMeters = resp.data.content.map(
          (element) => element.sqMeters
        );
        setSqMeters((prevSqMeters) => [...prevSqMeters, ...newSqMeters]);

        const newPricePerSqMeter = resp.data.content.map(
          (element) => element.pricePerSqMeter
        );
        setPricePerSqMeter((prevPricePerSqMeter) => [
          ...prevPricePerSqMeter,
          ...newPricePerSqMeter,
        ]);

        const newImageName = resp.data.content.map(
          (element) => element.imageName
        );
        setImageName((prevImageName) => [...prevImageName, ...newImageName]);

        setMaxPages(resp.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const handleSearchChange = () => {
      pageChangeHandler();
    };

    handleSearchChange();
  }, [search]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5e63b6",
          borderRadius: "6px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.6)",
          width: "95vh",
          marginBottom: 60,
        }}
      >
        {propertyType.length > 0 && (
          <ActionAreaCard
            setPropertyId={setPropertyId}
            id={id}
            propertyType={propertyType}
            listingType={listingType}
            sqMeters={sqMeters}
            pricePerSqMeter={pricePerSqMeter}
            imageName={imageName}
          ></ActionAreaCard>
        )}
        {propertyType.length > 1 && (
          <ActionAreaCard2
            setPropertyId={setPropertyId}
            id={id}
            propertyType={propertyType}
            listingType={listingType}
            sqMeters={sqMeters}
            pricePerSqMeter={pricePerSqMeter}
            imageName={imageName}
          ></ActionAreaCard2>
        )}
        {propertyType.length > 2 && (
          <ActionAreaCard3
            setPropertyId={setPropertyId}
            id={id}
            propertyType={propertyType}
            listingType={listingType}
            sqMeters={sqMeters}
            pricePerSqMeter={pricePerSqMeter}
            imageName={imageName}
          ></ActionAreaCard3>
        )}
        <Stack
          spacing={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 50,
            paddingBottom: 40,
          }}
        >
          <Pagination
            onChange={(event, pageNumber) =>
              pageChangeHandler(event, pageNumber)
            }
            className="customStyles"
            count={maxPages}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
}
