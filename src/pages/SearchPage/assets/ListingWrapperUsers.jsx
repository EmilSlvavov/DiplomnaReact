import * as React from "react";
import { Stack, Pagination } from "@mui/material";
import UserListing1 from "./UserListing1";
import UserListing2 from "./UserListing2";
import UserListing3 from "./UserListing3";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListingsWrapperUsers({ searchUser, setUserId }) {
  const [name, setName] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [maxPages, setMaxPages] = useState();
  const [id, setId] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const pageChangeHandler = async (event, pageNumber = 1) => {
    setPageNumber(pageNumber - 1);
    setId([]);
    setName([]);
    setImageName([]);
    getUsers(pageNumber - 1);
  };

  const getUsers = async (pageNum = 0) => {
    console.log(searchUser);
    axios
      .get(
        "https://emil-backend.popetsmaster.com/users/all?size=3&page=" +
          pageNum +
          "&search=" +
          searchUser,
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

        const newNames = resp.data.content.map((element) => element.name);
        setName((prevNames) => [...prevNames, ...newNames]);

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
      console.log(imageName);
    };

    handleSearchChange();
  }, [searchUser]);

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
        {name.length > 0 && (
          <UserListing1
            id={id}
            setUserId={setUserId}
            name={name}
            imageName={imageName}
          ></UserListing1>
        )}
        {name.length > 1 && (
          <UserListing2
            id={id}
            setUserId={setUserId}
            name={name}
            imageName={imageName}
          ></UserListing2>
        )}
        {name.length > 2 && (
          <UserListing3
            id={id}
            setUserId={setUserId}
            name={name}
            imageName={imageName}
          ></UserListing3>
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
            count={maxPages} //maxPages
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
}
