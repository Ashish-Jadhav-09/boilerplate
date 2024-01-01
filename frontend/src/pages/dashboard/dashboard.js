import React from "react";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { content } from "./content";
import { useThemeContext } from "../../context/theme/themeContext";
import { GET_ALL_USERS } from "../../apolloClient";
import { constants } from "../../config/constant";
import Chart from "../../components/chart/chart";
import { getChartOptions } from "../admin/adminDashboard/helper";

const Dashboard = () => {
  const { darkMode } = useThemeContext();
  const { data = {}, loading } = useQuery(GET_ALL_USERS, {
    variables: {
      role: constants.general,
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
              {content.USER_REGISTRATION_TREND_CHART}
            </Typography>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Card sx={{ mt: 1.5, border: "1px solid #EEF1F5" }}>
              <Box>
                <Chart
                  options={getChartOptions(darkMode, groupedData)}
                  series={[{ data: Object.values(groupedData) }]}
                  type="line"
                  height={450}
                  width={450}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
