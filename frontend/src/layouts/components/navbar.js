import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";

const adminPages = [
  { page: "DASHBOARD", url: "/admin-dashboard" },
  {
    page: "USER MANAGEMENT",
    url: "/admin-dashboard/user-management",
  },
];

const pages = [{ page: "DASHBOARD", url: `/dashboard` }];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{ height: "4rem", backgroundColor: "black", color: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component="div"
            variant="h6"
            noWrap
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontFamily: "fantasy",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {"Welcome"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {JSON.parse(localStorage.getItem("user")).role.toLowerCase() ===
              "admin"
                ? adminPages.map((element, index) => (
                    <MenuItem
                      key={`adminPages${index + 1}`}
                      onClick={handleCloseNavMenu}
                    >
                      <Link style={{ textDecoration: "none" }} to={element.url}>
                        <Typography
                          component="div"
                          style={{
                            color: "black",
                            textDecoration: "none",
                            textAlign: "center",
                          }}
                        >
                          {element.page}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))
                : pages.map((element, index) => (
                    <MenuItem
                      key={`pages${index + 1}`}
                      onClick={handleCloseNavMenu}
                    >
                      <Link style={{ textDecoration: "none" }} to={element.url}>
                        <Typography
                          component="div"
                          style={{
                            color: "black",
                            textDecoration: "none",
                            textAlign: "center",
                          }}
                        >
                          {element.page}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <Typography
            component="div"
            variant="h6"
            noWrap
            sx={{
              mr: 3,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "fantasy",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {"Welcome"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {JSON.parse(localStorage.getItem("user")).role.toLowerCase() ===
            "admin"
              ? adminPages.map((element, index) => (
                  <MenuItem
                    key={`adminPages${index + 1}`}
                    onClick={handleCloseNavMenu}
                  >
                    <Link style={{ textDecoration: "none" }} to={element.url}>
                      <Typography
                        component="div"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                      >
                        {element.page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))
              : pages.map((element, index) => (
                  <MenuItem
                    key={`pages${index + 1}`}
                    onClick={handleCloseNavMenu}
                  >
                    <Link style={{ textDecoration: "none" }} to={element.url}>
                      <Typography
                        component="div"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                      >
                        {element.page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
          </Box>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="info" style={{ marginRight: '15px' }}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${JSON.parse(localStorage.getItem("user")).firstName}`}
                  src={`${localStorage.getItem("avatar")}`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                <Typography component="div" textAlign="center">
                  {"Profile"}
                </Typography>
              </MenuItem>
              <MenuItem
                key="Logout"
                onClick={() => {
                  localStorage.clear();
                  navigate("/", { replace: true });
                }}
              >
                <Typography component="div" textAlign="center">
                  {"Logout"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
