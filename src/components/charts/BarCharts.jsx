import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarCharts = ({
  labels,
  shifts,
  barLabel1,
  barData1,
  barLabel2,
  barData2,
}) => {
  const combinedLabels = labels.map((date, index) => {
    return [date, shifts[index]];
  });

  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: barLabel1,
        data: barData1,
        backgroundColor: "#03a9f4",
      },
      {
        label: barLabel2,
        data: barData2,
        // type: "bar",
        backgroundColor: "#01579b",
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        // datalabels: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
export default BarCharts;
