import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const OEEChart = ({ dates, shifts, planedOee, actualOee }) => {
  const combinedLabels = dates.map((date, index) => {
    return [date, shifts[index]];
  });

  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: "Cél OEE (%)",
        data: planedOee,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: false,
      },
      {
        label: "OEE (%)",
        data: actualOee,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
      },
    ],
  };
  const options = {
    // plugins: {
    //   datalabels: {
    //     color: "white",
    //     anchor: "top",
    //     align: "start",
    //     formatter: (value, context) => {
    //       return value.toFixed(2);
    //     },
    //   },
    // },
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
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default OEEChart;
