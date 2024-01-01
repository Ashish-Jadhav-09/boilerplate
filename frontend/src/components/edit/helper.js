import * as yup from "yup";
import { colors } from "../../config/constant";

export const editUserValidationSchema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().email().label("Email Address").required(),
  password: yup.string().label("Password").required(),
});

export let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isTouched: {},
  error: {},
  isDisabled: true,
};

export const getSubmitButtonCss = (darkMode) => ({
  mb: 'auto',
  backgroundColor: darkMode
    ? colors.darkSecondaryBackgroundColor
    : colors.secondaryMain,
  color: colors.textLight,
  borderColor: darkMode ? colors.primaryMain : "#0063cc",
  "&:hover": {
    color: colors.textLight,
    backgroundColor: darkMode
      ? colors.darkSecondaryBackgroundColor
      : colors.secondaryMain,
    borderColor: darkMode ? colors.primaryMain : colors.secondaryMain,
  },
});

export const getCancelButtonCss = (darkMode) => ({
  mr: '25px',
  mb: 'auto',
  color: darkMode ? colors.textDark : colors.darkSecondaryBackgroundColor,
  borderColor: darkMode
    ? colors.darkSecondaryBackgroundColor
    : colors.primaryMain,
  "&:hover": {
    color: darkMode ? colors.textDark : colors.darkSecondaryBackgroundColor,
    borderColor: darkMode
      ? colors.darkSecondaryBackgroundColor
      : colors.primaryMain,
  },
});
