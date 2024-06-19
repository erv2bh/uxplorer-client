import { Doughnut } from "react-chartjs-2";
import { Plugin } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chart.js/auto";

import { useAtomValue } from "jotai";

import styled from "styled-components";

import { surveyResultsAtom } from "../../atoms/atoms";

interface SurveyResult {
  NPS: number;
}

interface NPSGroups {
  promotersPercentage: number;
  passivesPercentage: number;
  detractorsPercentage: number;
  npsScore: number;
}

function calculateNPSGroups(surveyResults: SurveyResult[]): NPSGroups {
  const npsScores = surveyResults.map((result) => result.NPS);
  const counts = { promoters: 0, passives: 0, detractors: 0 };

  npsScores.forEach((score) => {
    if (score >= 9) {
      counts.promoters += 1;
    } else if (score >= 7) {
      counts.passives += 1;
    } else {
      counts.detractors += 1;
    }
  });

  const totalResponses = npsScores.length;
  const promotersPercentage = (counts.promoters / totalResponses) * 100;
  const passivesPercentage = (counts.passives / totalResponses) * 100;
  const detractorsPercentage = (counts.detractors / totalResponses) * 100;

  const npsScore = promotersPercentage - detractorsPercentage;

  return {
    promotersPercentage,
    passivesPercentage,
    detractorsPercentage,
    npsScore,
  };
}

function NetPromoterScore() {
  const surveyResults = useAtomValue(surveyResultsAtom);
  const {
    promotersPercentage,
    passivesPercentage,
    detractorsPercentage,
    npsScore,
  } = calculateNPSGroups(surveyResults);

  const data = {
    labels: ["추천 그룹", "중립 그룹", "비추천 그룹"],
    datasets: [
      {
        label: "NPS Groups",
        data: [promotersPercentage, passivesPercentage, detractorsPercentage],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      centerText: false,
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
        formatter: (value: number) => `${value.toFixed(1)}%`,
      },
      title: {
        display: true,
        text: "Net Promoter Score (NPS) 그룹 분포",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <>
      <NpsContainer>
        <DoughnutChartContainer>
          <Doughnut data={data} options={options} plugins={[ChartDataLabels as Plugin<"doughnut">]} />
        </DoughnutChartContainer>
        <NpsScoreContainer>
          <h2>NPS 점수: {npsScore.toFixed(1)}</h2>
          <p>
            NPS 점수는 기업이나 제품의 고객 충성도와 만족도를 간단하면서도
            효과적으로 측정하는 지표입니다. 이 점수는 고객이 제품이나 서비스를
            다른 사람에게 추천할 가능성을 0부터 10까지의 척도로 나타내며, 이를
            통해 추천자, 중립자, 비평자의 세 그룹으로 분류합니다.
          </p>
          <h3>NPS = (추천자의 비율 − 비평자의 비율) × 100</h3>
        </NpsScoreContainer>
      </NpsContainer>
      <NpsDescriptionContainer>
        <h3>NPS 점수는 다음과 같은 방식으로 해석될 수 있습니다.</h3>
        <p>
          <strong>70점 이상:</strong> 탁월함. 높은 고객 충성도와 강력한 긍정적
          입소문을 나타냅니다.
        </p>
        <p>
          <strong>50점에서 69점 사이:</strong> 우수함. 좋은 고객 충성도를 가지고
          있지만, 개선의 여지가 있습니다.
        </p>
        <p>
          <strong>0점에서 49점 사이:</strong> 개선 필요. 고객 경험을 개선하여
          비평자의 비율을 줄이고 추천자를 늘릴 필요가 있습니다.
        </p>
        <p>
          <strong>0점 미만:</strong> 부정적. 즉각적인 개선이 필요하며, 고객
          만족도와 충성도를 높이기 위한 전략적 접근이 필요합니다.
        </p>
      </NpsDescriptionContainer>
    </>
  );
}

const DoughnutChartContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const NpsScoreContainer = styled.div`
  margin-top: 20px;
`;

const NpsContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin-top: 30px;
`;

const NpsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default NetPromoterScore;
