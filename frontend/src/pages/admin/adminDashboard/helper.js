import moment from "moment-timezone";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Paper } from "@mui/material";
import { colors, constants } from "../../../config/constant";

export const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === constants.dark ? colors.darkSecondaryBackgroundColor : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: "15px",
  color: theme.palette.mode === constants.dark ? colors.textDark : "inherit",
}));

export const adminSearchBar = {
  float: "left",
  marginRight: "30px",
  lineHeight: "1.75",
  padding: "5px 15px",
  backgroundColor: colors.darkSecondaryBackgroundColor,
};

export const adminTableColumn = [
  {
    label: "Activity",
    value: "activity",
  },
  {
    label: "Timestamp",
    value: "timestamp",
    format: (value) => moment(value).format("MMMM Do, YYYY"),
  },
  {
    label: "User",
    value: "user",
  },
];

export const getChartOptions = (darkMode, groupedData) => ({
  chart: {
    height: 465,
    type: "line",
    zoom: {
      enabled: false,
    },
    background: darkMode ? colors.darkSecondaryBackgroundColor : colors.backgroundLightPaper,
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
    width: 1.5,
  },
  title: {
    align: "left",
    style: {
      color: darkMode ? colors.textDark : colors.textLight,
    },
  },
  grid: {
    row: {
      colors: [darkMode ? colors.darkSecondaryBackgroundColor : "#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: Object.keys(groupedData),
    labels: {
      style: {
        colors: darkMode ? colors.textDark : colors.textLight,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: darkMode ? colors.textDark : colors.textLight,
      },
    },
  },
  tooltip: {
    theme: darkMode ? constants.dark : constants.light,
  },
  markers: {
    colors: darkMode ? colors.textDark : colors.primaryMain,
  },
  legend: {
    labels: {
      colors: darkMode ? colors.textDark : colors.textLight,
    },
  },
});
