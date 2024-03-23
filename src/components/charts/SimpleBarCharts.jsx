import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const SimpleBarCharts = ({ labels, shifts, barLabel, barData }) => {
  const combinedLabels = labels.map((date, index) => {
    return [date, shifts[index]];
  });

  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: barLabel,
        data: barData,
        backgroundColor: "#03a9f4",
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
export default SimpleBarCharts;
