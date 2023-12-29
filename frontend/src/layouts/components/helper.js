import {
  GifOutlined,
  InsertInvitationOutlined,
  MessageOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

export const tabCss = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "capitalize",
  padding: "0px",
};

export const tabIconCss = {
  marginBottom: 0,
  marginRight: "10px",
};

export const menuPaperCss = {
  width: 290,
  minWidth: 240,
  maxWidth: 290,
  position: "relative",
  mt: 1,
};

export const welcomeCss = {
  mr: 3,
  display: { xs: "none", md: "flex" },
  fontFamily: "fantasy",
  fontWeight: 700,
  letterSpacing: ".1rem",
  color: "inherit",
  textDecoration: "none",
};

export const welcomeMobileCss = {
  mr: 3,
  display: { xs: "flex", md: "none" },
  flexGrow: 1,
  fontFamily: "fantasy",
  fontWeight: 700,
  letterSpacing: ".1rem",
  color: "inherit",
  textDecoration: "none",
};

export const notificationListCss = {
  p: 0,
  "& .MuiListItemButton-root": {
    py: 0.5,
    "& .MuiAvatar-root": {
      width: 36,
      height: 36,
      fontSize: "1rem",
    },
    "& .MuiListItemSecondaryAction-root": {
      mt: "6px",
      ml: 1,
      top: "auto",
      right: "auto",
      alignSelf: "flex-start",
      transform: "none",
      position: "relative",
    },
  },
};

export const popperOptions = (matchesXs) => ({
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [matchesXs ? -5 : 0, 9],
      },
    },
  ],
});

export const getPaperCss = (theme) => ({
  width: "100%",
  minWidth: 285,
  maxWidth: 420,
  [theme.breakpoints.down("md")]: {
    maxWidth: 285,
  },
  mt: 1,
});

export const notifications = [
  {
    AvtarIcon: <GifOutlined />,
    notificationText: `It's Cristina danny's birthday today.`,
    notificationSecondaryText: "2 min ago",
    notificationTime: "03:00 AM",
    key: 1,
    sx: {
      color: "success.main",
      bgcolor: "success.lighter",
    },
  },
  {
    AvtarIcon: <MessageOutlined />,
    notificationText: "Aida Burg commented your post.",
    notificationSecondaryText: "5 August",
    notificationTime: "06:00 PM",
    key: 2,
    sx: {
      color: "primary.main",
      bgcolor: "primary.lighter",
    },
  },
  {
    AvtarIcon: <SettingsOutlined />,
    notificationText: "Your Profile is Complete 60%",
    notificationSecondaryText: "7 hours ago",
    notificationTime: "02:45 PM",
    key: 3,
    sx: {
      color: "error.main",
      bgcolor: "error.lighter",
    },
  },
  {
    AvtarIcon: <InsertInvitationOutlined />,
    notificationText: "Cristina Danny invited to join Meeting.",
    notificationSecondaryText: "Daily scrum meeting time",
    notificationTime: "09:10 AM",
    key: 4,
    sx: {
      color: "primary.main",
      bgcolor: "primary.lighter",
    },
  },
];
