import { useAtomValue } from "jotai";

import styled from "styled-components";

import TotalSuccessResult from "../../charts/TotalSuccessRate";
import MissionTimeComparison from "../../charts/MissionTimeComparison";

import {
  testerDataAtom,
  completedMissionCountAtom,
  completedTesterAtom,
} from "../../../atoms/atoms";

function TotalResults() {
  const { totalCompletedMissionsCount } = useAtomValue(
    completedMissionCountAtom,
  );
  const testerCount = useAtomValue(testerDataAtom).length;
  const completedTesterCount = useAtomValue(completedTesterAtom).length;

  return totalCompletedMissionsCount > 0 ? (
    <>
      <TextContainer>
        <div>총 테스터: {testerCount}명</div>
        <div>완료 테스터: {completedTesterCount}명</div>
        <div>미완료 테스터: {testerCount - completedTesterCount}명</div>
      </TextContainer>
      <ChartsContainer>
        <TotalSuccessResult />
        <MissionTimeComparison />
      </ChartsContainer>
    </>
  ) : (
    <TextContainer>테스트에 참여한 인원이 없습니다.</TextContainer>
  );
}

const ChartsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  margin-bottom: 20px;
`;

export default TotalResults;
