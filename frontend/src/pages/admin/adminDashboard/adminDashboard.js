import React, { lazy, useState } from "react";
import { Card, Typography } from "@mui/material";
import { adminTableColumn } from "./helper";
import { handleOnTableDataSort } from "../../../config/constant";

const GenericTable = lazy(() =>
  import("../../../components/table/genericTable")
);

const AdminDashboard = () => {
  const tableData = [
    {
      activity: "Log in",
      timestamp: "2023-10-15 09:30:00",
      user: "John Doe",
    },
    {
      activity: "Create a post",
      timestamp: "2023-10-15 10:15:00",
      user: "Alice Smith",
    },
    {
      activity: "Log out",
      timestamp: "2023-10-15 11:45:00",
      user: "Bob Johnson",
    },
  ];

  const [order, setSortOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("status");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activityLogData, setActivityLogData] = useState(tableData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const handleOnSort = (value) => {
    setOrderBy(value);
    const tableDataSort = handleOnTableDataSort(orderBy, order);
    activityLogData.sort(tableDataSort);
    if (order === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem 1rem 1rem 1rem",
        }}
      >
        <Typography color="textSecondary" gutterBottom variant="overline">
          Activity Log
        </Typography>
        <GenericTable
          columns={adminTableColumn}
          data={activityLogData || []}
          order={order}
          orderBy={orderBy}
          handleOnSort={handleOnSort}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
