import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  Stack,
  CircularProgress,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../apolloClient";
import { StyledAvatar, StyledPaper } from "./helper";
import { content } from "./content";
import { useThemeContext } from "../../context/theme/themeContext";
import { colors } from "../../config/constant";

const UserProfile = () => {
  const { darkMode } = useThemeContext();
  const { data = {}, loading } = useQuery(GET_PROFILE, {
    fetchPolicy: "network-only",
  });

  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setProfile({ ...profile, ...data?.getProfile });
  }, [data]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <StyledPaper darkMode={darkMode}>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleEditClick}
        >
          <Edit />
        </IconButton>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledAvatar
              alt={`${profile?.firstName} ${profile?.lastName}`}
              src={`${profile?.firstName} ${profile?.lastName}`}
            >
              {`${profile?.firstName?.charAt(0)}${profile?.lastName?.charAt(
                0
              )}`}
            </StyledAvatar>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            {editMode ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={profile?.firstName}
                    fullWidth
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={profile?.lastName}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    label="Role"
                    variant="outlined"
                    value={
                      profile.role.charAt(0).toUpperCase() +
                      profile.role.slice(1)
                    }
                    disabled
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={profile?.bio}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Website"
                    variant="outlined"
                    value={profile?.website}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "96%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography variant="h4" gutterBottom marginRight="10px">
                      {`${profile?.firstName}`}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {`${profile?.lastName}`}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" color="textSecondary">
                    {profile?.role?.charAt(0).toUpperCase() +
                      profile?.role?.slice(1)}
                  </Typography>
                  <Typography variant="body1">{profile?.bio}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    <strong>{content.CONTACT_INFORMATION}</strong>
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1">
                      <strong>{content.EMAIL_LABEL}</strong> {profile?.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{content.CONTACT_NO}</strong> {profile?.contactNo}
                    </Typography>
                    <Typography variant="body1">
                      <strong>{content.WEBSITE}</strong>
                      <Link href={profile?.website}>{profile?.website}</Link>
                    </Typography>
                  </Stack>
                </div>
              </div>
            )}
            {editMode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                  fullWidth
                  style={{
                    marginRight: "10px",
                    backgroundColor: darkMode ? colors.darkSecondaryBackgroundColor : colors.primaryMain,
                  }}
                >
                  {content.SAVE}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelClick}
                  fullWidth
                  style={{
                    color: darkMode ? colors.textLight : colors.primaryMain,
                    borderColor: darkMode ? colors.darkSecondaryBackgroundColor : colors.primaryMain,
                  }}
                >
                  {content.CANCEL}
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </StyledPaper>
    </div>
  );
};

export default UserProfile;
