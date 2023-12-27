import React from "react";
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

const SettingTab = () => {
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
        onClick={() => navigate(routes.SUPPORT, { replace: true })}
      >
        <ListItemIcon>
          <QuestionAnswerOutlined />
        </ListItemIcon>
        <ListItemText primary={content.SUPPORT} />
      </ListItemButton>
      <ListItemButton
        onClick={() => navigate(routes.ACCOUNT_SETTINGS, { replace: true })}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={content.ACCOUNT_SETTINGS} />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
