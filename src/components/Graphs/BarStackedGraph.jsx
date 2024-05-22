import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function BarStackedGraph({ data, graphTitle, config }) {
  const options = {
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: graphTitle,
        font: { family: "Helvetica", size: 16, weight: "normal" },
        color: "#384555",
      },
      legend: {
        position: "bottom",
        labels: {
          font: { family: "Helvetica", size: 12, weight: "normal" },
          color: "#697685",
        },
      },
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        font: { family: "Helvetica", size: 12, weight: "normal" },
        color: "white",
      },
    },
    responsive: true,
    scales: {
      x: {
        display: false,
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          font: { family: "Helvetica", size: 14, weight: "normal" },
          color: "#697685",
        },
      },
    },
    ...config,
  };

  return <Bar data={data} plugins={[ChartDataLabels]} options={options} />;
}

BarStackedGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.array.isRequired,
      datasets: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          data: PropTypes.array.isRequired,
          backgroundColor: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired
  ),
  graphTitle: PropTypes.string,
  config: PropTypes.any,
};

export default BarStackedGraph;
