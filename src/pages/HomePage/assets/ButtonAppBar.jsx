import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { LoginContext } from "../../../Context";
import { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccountCircle } from "@mui/icons-material";

export default function ButtonAppBar() {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#5e63b6" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Button
            color="inherit"
            style={{
              backgroundColor: "#a393eb",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            style={{
              backgroundColor: "#a393eb",
              marginLeft: "1%",
            }}
            onClick={() => {
              navigate("/search");
            }}
          >
            Search
          </Button>
          <Typography sx={{ flexGrow: 1 }}></Typography>

          {loggedIn ? (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                navigate("/profile");
              }}
              color="inherit"
            >
              <AccountCircle></AccountCircle>
            </IconButton>
          ) : (
            <>
              <Button
                color="inherit"
                style={{
                  backgroundColor: "#a393eb",
                  marginRight: "1%",
                }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                style={{
                  backgroundColor: "#a393eb",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
