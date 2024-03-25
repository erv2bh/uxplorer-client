import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAtomValue } from "jotai";

import styled from "styled-components";

import { missionsDataAtom, completedMissionDataAtom } from "../../atoms/atoms";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function MissionTimeComparison() {
  const missionsData = useAtomValue(missionsDataAtom);
  const completedMissionData = useAtomValue(completedMissionDataAtom);

  const expectedDurations = missionsData.map(
    (mission) => mission.expectedDuration,
  );
  const actualAverages = completedMissionData.map((mission) => {
    const missionCompletedData = completedMissionData.filter(
      (m) => m.order === mission.order,
    );

    const totalDuration = missionCompletedData.reduce(
      (acc, curr) => acc + (curr.completedBy.duration || 0),
      0,
    );

    const averageDuration =
      missionCompletedData.length > 0
        ? totalDuration / missionCompletedData.length
        : 0;

    return averageDuration;
  });

  const data = {
    labels: missionsData.map((_, index) => `미션 ${index + 1}`),
    datasets: [
      {
        label: "평균 소요시간",
        data: actualAverages,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "예상 소요시간",
        data: expectedDurations,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      centerText: false,
      title: {
        display: true,
        text: "미션별 소요시간",
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <BarChartContainer>
      <Bar data={data} options={options} />
    </BarChartContainer>
  );
}

const BarChartContainer = styled.div`
  width: 700px;
  height: 400px;
`;

export default MissionTimeComparison;
