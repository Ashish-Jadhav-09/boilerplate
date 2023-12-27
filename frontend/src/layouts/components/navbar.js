import React, { Suspense, lazy, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  CircularProgress,
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
import { Link } from "react-router-dom";
import { content } from "./content";
import { adminPages, constants, userPages } from "../../config/constant";

const Profile = lazy(() => import("./menuSection"));

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
      style={{
        height: "4rem",
        backgroundColor: "black",
        color: "white",
        position: "absolute",
      }}
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
              {JSON.parse(
                localStorage.getItem(constants.user)
              ).role.toLowerCase() === constants.admin
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
                : userPages.map((element, index) => (
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
            {content.WELCOME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {JSON.parse(
              localStorage.getItem(constants.user)
            ).role.toLowerCase() === constants.admin
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
              : userPages.map((element, index) => (
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
            <Badge
              badgeContent={4}
              color="info"
              style={{ marginRight: "15px" }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={content.OPEN_SETTINGS_TOOLTIP}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Suspense fallback={<CircularProgress />}>
                  <Profile
                    anchorElUser={anchorElUser}
                    handleCloseUserMenu={handleCloseUserMenu}
                  />
                </Suspense>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
