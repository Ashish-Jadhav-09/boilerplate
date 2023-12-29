import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router";
import NavBar from "../components/navbar";
import { Box, Toolbar } from "@mui/material";

const PrivateLayout = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthenticated(true);
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (authenticated) {
    return (
      <>
        <NavBar />
        <Box component="main" style={{ backgroundColor: "#FAFAFB" }}>
          <Toolbar />
          {children}
        </Box>
      </>
    );
  }
  return <></>;
};

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
