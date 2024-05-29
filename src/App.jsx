import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useActionData,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import Property from "./pages/PropertyPage/Property";
import ButtonAppBar from "./pages/HomePage/assets/ButtonAppBar";
import Profile from "./pages/ProfilePage/Profile";
import EditProfile from "./pages/EditProfilePage/EditProfile";
import { LoginContext } from "./Context";
import { IsAdminContext } from "./Context";
import { useState, useEffect } from "react";
import Search from "./pages/SearchPage/Search";
import AddProperty from "./pages/AddPropertyPage/AddProperty";
import EditProperty from "./pages/EditPropertyPage/EditProperty";
import OtherProfile from "./pages/OtherProfilePage/OtherProfile";
import EditOtherProfile from "./pages/EditOtherProfilePage/EditOtherProfile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [myJwt, setJwt] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <ButtonAppBar></ButtonAppBar>
          <Routes>
            <Route
              path="/"
              element={
                <Home setPropertyId={setPropertyId} myJwt={myJwt}></Home>
              }
            ></Route>
            <Route
              path="/register"
              element={<Register myJwt={myJwt}></Register>}
            ></Route>
            <Route
              path="/login"
              element={<Login setJwt={setJwt}></Login>}
            ></Route>
            <Route
              path="/property"
              element={
                <Property propertyId={propertyId} myJwt={myJwt}></Property>
              }
            ></Route>
            <Route
              path="/profile"
              element={<Profile setJwt={setJwt} myJwt={myJwt}></Profile>}
            ></Route>
            <Route
              path="/otherprofile"
              element={
                <OtherProfile
                  userId={userId}
                  setJwt={setJwt}
                  myJwt={myJwt}
                ></OtherProfile>
              }
            ></Route>
            <Route
              path="/editprofile"
              element={<EditProfile myJwt={myJwt}></EditProfile>}
            ></Route>
            <Route
              path="/editotherprofile"
              element={
                <EditOtherProfile
                  userId={userId}
                  myJwt={myJwt}
                ></EditOtherProfile>
              }
            ></Route>
            <Route
              path="/search"
              element={
                <Search
                  setPropertyId={setPropertyId}
                  setUserId={setUserId}
                  myJwt={myJwt}
                ></Search>
              }
            ></Route>
            <Route
              path="/addproperty"
              element={<AddProperty myJwt={myJwt}></AddProperty>}
            ></Route>
            <Route
              path="/editproperty"
              element={
                <EditProperty
                  propertyId={propertyId}
                  myJwt={myJwt}
                ></EditProperty>
              }
            ></Route>
          </Routes>
        </IsAdminContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
