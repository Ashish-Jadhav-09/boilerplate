import React from "react";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
// import Chart from "../../../components/chart/chart";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../apolloClient";

const AdminDashboard = () => {
  const { data = {}, loading } = useQuery(GET_ALL_USERS, {
    variables: {
      role: "general",
    },
    fetchPolicy: "network-only",
  });

  const groupedData = (data?.getUserData || []).reduce((acc, { createdAt }) => {
    const dateKey = createdAt?.split("T")[0];

    if (dateKey) {
      acc[dateKey] = (acc[dateKey] || 0) + 1;
    }

    return acc;
  }, {});

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ margin: "2rem" }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} md={7} lg={8}>
          <Grid item>
            <Typography variant="h7">
              {"User Registration Trend Chart"}
            </Typography>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Card sx={{ mt: 1.5, border: "1px solid #EEF1F5" }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                {/* <Chart
                  options={{
                    chart: {
                      height: 450,
                      type: "line",
                      zoom: {
                        enabled: false,
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      curve: "smooth",
                      width: 1.5,
                    },
                    title: {
                      align: "left",
                    },
                    grid: {
                      row: {
                        colors: ["#f3f3f3", "transparent"],
                        opacity: 0.5,
                      },
                    },
                    xaxis: {
                      categories: Object.keys(groupedData),
                    },
                  }}
                  series={[{ data: Object.values(groupedData) }]}
                  type="line"
                  height={450}
                  width={450}
                /> */}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
