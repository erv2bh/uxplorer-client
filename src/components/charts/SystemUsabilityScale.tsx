import { Doughnut } from "react-chartjs-2";
import { TooltipItem, Plugin } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import "chart.js/auto";

import { useAtomValue } from "jotai";

import styled from "styled-components";

import { surveyResultsAtom } from "../../atoms/atoms";

interface SurveyResult {
  SUS: number[];
}

function calculateSUS(susScores: number[]): number {
  const oddSum = susScores.reduce(
    (sum, score, index) => sum + (index % 2 === 0 ? score : 0),
    0,
  );
  const evenSum = susScores.reduce(
    (sum, score, index) => sum + (index % 2 !== 0 ? score : 0),
    0,
  );
  return (oddSum - 5 + (25 - evenSum)) * 2.5;
}

function SystemUsabilityScale() {
  const surveyResults = useAtomValue(surveyResultsAtom) as SurveyResult[];
  const averageSUS =
    surveyResults.reduce(
      (total, result) => total + calculateSUS(result.SUS),
      0,
    ) / surveyResults.length;

  const data = {
    labels: ["SUS 점수"],
    datasets: [
      {
        label: "SUS Score",
        data: [averageSUS, 100 - averageSUS],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(201, 203, 207, 0.2)"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
        formatter: (context: Context) => {
          if (context.dataIndex === 0) {
            return averageSUS.toFixed(1);
          }
          return null;
        },
      },
      title: {
        display: true,
        text: `시스템 사용성 척도(SUS) - 점수: ${averageSUS.toFixed(1)}`,
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label(context: TooltipItem<"doughnut">) {
            if (context.dataIndex === 0) {
              return `SUS 점수: ${context.parsed}`;
            }
            return "";
          },
        },
      },
    },
  };

  return (
    <SusContainer>
      <DoughnutChartContainer>
        <Doughnut data={data} options={options} plugins={[ChartDataLabels as Plugin<"doughnut">]} />
      </DoughnutChartContainer>
      <DescriptionContainer>
        <h2>시스템 사용성 척도(System Usability Scale)</h2>
        <p>
          SUS 점수는 0부터 100까지의 범위를 가지며, 사용자 경험의 질을 측정하기
          위해 사용됩니다. 점수가 높을수록 사용성이 뛰어난 것으로 간주됩니다.
          일반적으로 68점이 평균값으로 간주되며, 80점 이상이면 사용성이 우수한
          제품 또는 서비스로 평가됩니다.
        </p>
      </DescriptionContainer>
    </SusContainer>
  );
}

const DoughnutChartContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const DescriptionContainer = styled.div`
  margin-top: 20px;
`;

const SusContainer = styled.div`
  display: flex;
  max-width: 800px;
`;

export default SystemUsabilityScale;
