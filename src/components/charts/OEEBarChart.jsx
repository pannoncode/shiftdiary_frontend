import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.register(ChartDataLabels);

const OEEBarChart = ({ labels, shifts, planedOee, actualOee }) => {
  const combinedLabels = labels.map((date, index) => {
    return [date, shifts[index]];
  });
  const barColors = actualOee.map((value, index) => {
    return value < planedOee[index]
      ? "rgba(255, 99, 132, 1)"
      : "rgba(75, 192, 192, 1)";
  });
  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: "Aktuális OEE",
        data: actualOee,
        backgroundColor: barColors,
        // datalabels: {
        //   color: "white",
        //   anchor: "top",
        //   align: "start",
        //   formatter: (value, context) => {
        //     return value.toFixed(2); // Vagy bármilyen formázást itt alkalmazhat
        //   },
        // },
      },
      {
        label: "OEE Cél",
        data: planedOee,
        type: "line",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        // datalabels: false,
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
    //       return value.toFixed(2); // Vagy bármilyen formázást itt alkalmazhat
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
export default OEEBarChart;
