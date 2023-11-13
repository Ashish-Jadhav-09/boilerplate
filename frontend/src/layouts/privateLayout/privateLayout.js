import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../components/navbar';

const PrivateLayout = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  if (authenticated) {
    return (
      <div>
        <CssBaseline />
        <NavBar />
        {children}
      </div>
    );
  }
  return <></>;
};

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
