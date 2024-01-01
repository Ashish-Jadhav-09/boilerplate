export const getTableStyles = (theme) => ({
  tableContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    width: "100%",
  },
  tableCell: {
    color: theme.palette.text.primary,
    padding: "10px 0px 10px 0px",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tableRow: {
    padding: "5px 0px 5px 0px",
    borderBottomColor: theme.palette.divider,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
});
