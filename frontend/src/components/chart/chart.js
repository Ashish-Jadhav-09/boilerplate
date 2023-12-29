import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";

const Chart = ({ options, series, type, height, width }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

Chart.defaultProps = {
  options: {},
  series: [],
  type: "area",
  height: 100,
  width: 100,
};

Chart.propTypes = {
  options: PropTypes.object,
  series: PropTypes.array,
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Chart;
