import * as React from "react";
import ListingsWrapper from "./assets/ListingsWrapper";
import { useEffect } from "react";
import { LoginContext, IsAdminContext } from "../../Context";
import { useContext } from "react";
import axios from "axios";

function Home({ myJwt, setPropertyId }) {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);

  const checkForAdmin = () => {
    if (loggedIn === true) {
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
            if (response.data.id === 1) {
              setIsAdmin(true);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    checkForAdmin();
  });

  return (
    <>
      <ListingsWrapper
        setPropertyId={setPropertyId}
        myJwt={myJwt}
      ></ListingsWrapper>
    </>
  );
}

export default Home;
