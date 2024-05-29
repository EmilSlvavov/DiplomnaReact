import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import default_pfp from "./default_pfp.jpg";
import axios from "axios";

export default function UserListing1({ name, imageName, setUserId, id }) {
  let navigate = useNavigate();
  const [image, setImage] = useState(null);

  const getImage = async () => {
    axios
      .get("https://emil-backend.popetsmaster.com/images/" + imageName[0], {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setImage(url);
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Card
      style={{ backgroundColor: "#a393eb" }}
      sx={{
        component: "img",
        maxWidth: 450,
        marginTop: 5,
        marginBottom: 5,
        minWidth: 450,
      }}
    >
      <CardActionArea
        onClick={() => {
          setUserId(id[0]);
          navigate("/otherprofile");
        }}
      >
        {image != null ? (
          <img
            src={image}
            style={{
              aspectRatio: "16/9",
              objectFit: "cover",
              maxHeight: "260px",
              minWidth: 450,
            }}
          ></img>
        ) : (
          <img
            src={default_pfp}
            style={{
              aspectRatio: "16/9",
              objectFit: "cover",
              maxHeight: "260px",
              minWidth: 450,
            }}
          ></img>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
