import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router";
import NavBar from "../components/navbar";
import { Toolbar } from "@mui/material";
import { constants, routes } from "../../config/constant";

const PrivateLayout = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(constants.accessToken)) {
      setAuthenticated(true);
    } else {
      navigate(routes.LOGIN, { replace: true });
    }
  }, [navigate]);

  if (authenticated) {
    return (
      <>
        <NavBar />
        <Toolbar />
        {children}
      </>
    );
  }
  return <></>;
};

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
