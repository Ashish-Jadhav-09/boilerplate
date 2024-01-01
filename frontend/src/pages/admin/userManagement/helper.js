import * as yup from "yup";
import { colors } from "../../../config/constant";

export const getUserManagementSearchBarStyles = (theme, darkMode) => ({
  left: "10px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "5px",
  border: `1px solid ${
    darkMode ? theme.palette.divider : '#BDBDBD'
  }`,
});

export const getButtonStyles = (theme, darkMode) => ({
  marginLeft: "20px",
  padding: "5px 15px",
  backgroundColor: theme.palette.background.paper,
  color: darkMode ? theme.palette.common.white : theme.palette.text.primary,
  border: `1px solid ${
    darkMode ? theme.palette.divider : '#BDBDBD'
  }`,
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
});

export const getAddUserCancelButtonStyles = (theme, darkMode) => ({
  mb: "10px",
  color: darkMode ? theme.palette.common.white : theme.palette.text.primary,
  borderColor: theme.palette.primary.main,
  "&:hover": {
    color: darkMode ? theme.palette.common.white : theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
});

export const getAddUserSubmitButtonStyles = (theme, darkMode) => ({
  mr: "25px",
  mb: "10px",
  backgroundColor: darkMode
    ? colors.darkSecondaryBackgroundColor
    : colors.secondaryMain,
  color: colors.textLight,
  borderColor: darkMode ? colors.primaryMain : "#0063cc",
  "&:hover": {
    color: theme.palette.background.paper,
    backgroundColor: darkMode
      ? colors.darkSecondaryBackgroundColor
      : colors.secondaryMain,
    borderColor: darkMode ? colors.primaryMain : colors.secondaryMain,
  },
});

export const userManagementTableColumn = [
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Action',
    value: 'Icon',
  },
];

export const addUserState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isTouched: {},
  error: {},
  isDisabled: true,
};

export const addUserValidationSchema = yup.object({
  firstName: yup.string().label('First Name').required(),
  lastName: yup.string().label('Last Name').required(),
  email: yup.string().email().label('Email Address').required(),
  password: yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'At least one lowercase character is required')
    .matches(/[A-Z]/, 'At least one uppercase character is required')
    .matches(/[0-9]/, 'At least one number is required')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const userStatistics = [
  {
    title: 'Total Users',
    count: '4,42,236',
    percentage: 59.3,
    color: 'success',
    extra: '35,000',
  },
  {
    title: 'Active Users',
    count: '78,250',
    percentage: 70.5,
    color: 'success',
    extra: '8,900',
  },
  {
    title: 'Inactive Users',
    count: '18,000',
    percentage: 27.4,
    color: 'warning',
    extra: '1,943',
  },
  {
    title: 'Deleted Users',
    count: '0',
    percentage: 27.4,
    color: 'error',
    extra: '$20,395',
  },
];
