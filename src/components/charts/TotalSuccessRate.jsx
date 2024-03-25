import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useAtomValue } from "jotai";

import styled from "styled-components";

import { completedMissionCountAtom } from "../../atoms/atoms";

Chart.register(ArcElement, Tooltip, Legend, Title);

function TotalSuccessResult() {
  const { completedMissionsCount, totalCompletedMissionsCount } = useAtomValue(
    completedMissionCountAtom,
  );

  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart) => {
      const { ctx } = chart;
      const { width, height } = chart;
      const percentage = `${((chart.data.datasets[0].data[0] / (chart.data.datasets[0].data[0] + chart.data.datasets[0].data[1])) * 100).toFixed(2)}%`;

      ctx.save();
      ctx.font = "15px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(percentage, width / 2, height / 2 + 70);
      ctx.restore();
    },
  };

  Chart.register(centerTextPlugin);

  const data = {
    labels: ["성공 미션", "실패 미션"],
    datasets: [
      {
        label: "미션 성공률",
        data: [
          completedMissionsCount,
          totalCompletedMissionsCount - completedMissionsCount,
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "미션 성공률",
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            const labelIndex = context.dataIndex;
            const label = context.chart.data.labels[labelIndex];

            if (label === "성공 미션") {
              return `${context.raw}개`;
            }

            return `${context.raw}개`;
          },
        },
      },
    },
  };

  return (
    <TotalSuccessRateContainer>
      <Pie data={data} options={options} />
    </TotalSuccessRateContainer>
  );
}

const TotalSuccessRateContainer = styled.div`
  width: 290px;
`;

export default TotalSuccessResult;
