import React, { Suspense, lazy, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { LogoutOutlined, SettingsOutlined, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { tabCss, tabIconCss, menuPaperCss } from "./helper";
import { content } from "./content";
import { constants } from "../../config/constant";

const ProfileTab = lazy(() => import("./profileSection"));
const SettingTab = lazy(() => import("./settingsSection"));
const MainCard = lazy(() => import("../../components/mainCard/mainCard"));
const TabPanel = lazy(() => import("../../components/tabPanel/tabPanel"));

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = JSON.parse(localStorage.getItem(constants.user));
  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? "grey.300" : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt={userName} src={userName}>
            {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
          </Avatar>
          <Typography variant="subtitle1" color="white">
            {userName}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={Boolean(open)}
        anchorEl={anchorRef.current}
      >
        {Boolean(open) && (
          <Paper
            sx={{
              ...menuPaperCss,
              [theme.breakpoints.down("md")]: {
                maxWidth: 250,
              },
            }}
          >
            <Suspense fallback={<CircularProgress />}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Stack
                          direction="row"
                          spacing={1.25}
                          alignItems="center"
                        >
                          <Avatar alt={userName} src={userName}>
                            {`${user.firstName.charAt(0)}${user.lastName.charAt(
                              0
                            )}`}
                          </Avatar>
                          <Stack>
                            <Typography variant="h6">{userName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <IconButton size="large" onClick={handleLogout}>
                          <LogoutOutlined />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="profile tabs"
                  >
                    <Tab
                      sx={tabCss}
                      icon={<Person style={tabIconCss} />}
                      label={content.PROFILE_LABEL}
                      value={0}
                    />
                    <Tab
                      sx={tabCss}
                      icon={<SettingsOutlined style={tabIconCss} />}
                      label={content.SETTINGS_LABEL}
                      value={1}
                    />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Suspense fallback={<CircularProgress />}>
                      <ProfileTab
                        handleLogout={handleLogout}
                        handleToggle={handleToggle}
                      />
                    </Suspense>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Suspense fallback={<CircularProgress />}>
                      <SettingTab handleToggle={handleToggle} />
                    </Suspense>
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Suspense>
          </Paper>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
