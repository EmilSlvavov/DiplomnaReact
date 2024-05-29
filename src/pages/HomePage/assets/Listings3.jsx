import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ActionAreaCard3({
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
      .get("https://emil-backend.popetsmaster.com/images/" + imageName[2], {
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
          setPropertyId(id[2]);
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
            {propertyType[2]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sqMeters[2] * pricePerSqMeter[2]}Bgn, {listingType[2]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
