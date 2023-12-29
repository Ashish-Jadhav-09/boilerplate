import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { QuestionAnswerOutlined, Person } from "@mui/icons-material";
import { content } from "./content";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/constant";

const SettingTab = (props) => {
  const { handleToggle } = props;
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
      <ListItemButton
        onClick={() => {
          navigate(routes.SUPPORT, { replace: true });
          handleToggle();
        }}
      >
        <ListItemIcon>
          <QuestionAnswerOutlined />
        </ListItemIcon>
        <ListItemText primary={content.SUPPORT} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate(routes.ACCOUNT_SETTINGS, { replace: true });
          handleToggle();
        }}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={content.ACCOUNT_SETTINGS} />
      </ListItemButton>
    </List>
  );
};

SettingTab.defaultProps = {
  handleToggle: () => {},
};

SettingTab.propTypes = {
  handleToggle: PropTypes.func,
};

export default SettingTab;
