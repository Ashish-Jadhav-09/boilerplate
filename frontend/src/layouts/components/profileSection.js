import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Person, LogoutOutlined } from "@mui/icons-material";
import { content } from "./content";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/constant";

const ProfileTab = (props) => {
  const { handleLogout } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton onClick={() => navigate(routes.PROFILE, { replace: true })}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={content.PROFILE_LABEL} />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary={content.LOGOUT} />
      </ListItemButton>
    </List>
  );
};

ProfileTab.defaultProps = {
  handleLogout: () => {},
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
