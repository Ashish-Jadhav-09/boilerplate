import { Suspense, lazy, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Notifications, CloseOutlined } from "@mui/icons-material";
import {
  getPaperCss,
  notificationListCss,
  notifications,
  popperOptions,
} from "./helper";
import { content } from "./content";

const MainCard = lazy(() => import("../../components/mainCard/mainCard"));
const Transitions = lazy(() =>
  import("../../components/transition/transition")
);

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75, mr: 1.5 }}>
      <IconButton
        disableRipple
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Badge
          badgeContent={4}
          color="secondary"
          variant="standard"
          style={{
            color: theme.palette.background.default,
          }}
        >
          <Notifications />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        transition
        popperOptions={popperOptions(matchesXs)}
      >
        {({ TransitionProps }) => (
          <Suspense fallback={<CircularProgress />}>
            <Transitions type="fade" in={open} {...TransitionProps}>
              <Paper sx={getPaperCss(theme)}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard
                    title={
                      <Typography variant="h5">
                        {content.NOTIFICATIONS}
                      </Typography>
                    }
                    elevation={0}
                    border={false}
                    content={false}
                    secondary={
                      <IconButton size="small" onClick={handleToggle}>
                        <CloseOutlined />
                      </IconButton>
                    }
                  >
                    <List component="nav" sx={notificationListCss}>
                      {notifications.map(
                        ({
                          AvtarIcon,
                          notificationSecondaryText,
                          notificationText,
                          notificationTime,
                          sx,
                        }) => (
                          <>
                            <ListItemButton>
                              <ListItemAvatar>
                                <Avatar sx={sx}>{AvtarIcon}</Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={notificationText}
                                secondary={notificationSecondaryText}
                              />
                              <ListItemSecondaryAction>
                                <Typography variant="caption" noWrap>
                                  {notificationTime}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                          </>
                        )
                      )}
                    </List>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          </Suspense>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
