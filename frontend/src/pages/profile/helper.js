import { Avatar, Paper } from "@mui/material";
import { styled } from "@mui/system";
import * as yup from "yup";

export const userProfileValidationSchema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().email().label("Email Address").required(),
});

export const StyledPaper = styled(Paper)({
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: "1rem",
  width: "97.5%",
  position: "relative",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  overflow: "hidden",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

export const StyledAvatar = styled(Avatar)({
  width: "150px",
  height: "150px",
  position: "static",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "80px"
});
