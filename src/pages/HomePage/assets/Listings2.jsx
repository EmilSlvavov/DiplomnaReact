import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import apartment1 from "./apartment1.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ActionAreaCard2({
  id,
  propertyType,
  listingType,
  sqMeters,
  pricePerSqMeter,
  imageName,
  setPropertyId,
}) {
  let navigate = useNavigate();
  const [image, setImage] = useState(null);

  const getImage = async () => {
    axios
      .get("https://emil-backend.popetsmaster.com/images/" + imageName[1], {
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
          setPropertyId(id[1]);
          navigate("/property");
        }}
      >
        <img
          src={image}
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
            maxHeight: "260px",
            minWidth: 450,
          }}
        ></img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {propertyType[1]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sqMeters[1] * pricePerSqMeter[1]}Bgn, {listingType[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
