import { useNavigate } from "react-router-dom";

import { useAtomValue, useSetAtom } from "jotai";

import styled from "styled-components";

import formatDate from "../../utils/formatDate";
import {
  currentTestDataAtom,
  missionsDataAtom,
  testDetailAtom,
  testerDataAtom,
} from "../../atoms/atoms";

function TestInfo() {
  const navigate = useNavigate();
  const setTestDetail = useSetAtom(testDetailAtom);
  const testDetail = useAtomValue(currentTestDataAtom);
  const testerEmails = useAtomValue(testerDataAtom);
  const missions = useAtomValue(missionsDataAtom);

  const isTestExpired = new Date(testDetail.deadline) < new Date();

  function handleRecreateTest() {
    setTestDetail({
      testName: testDetail.title,
      testDescription: testDetail.description,
      testUrl: testDetail.testUrl,
      testDeadline: "",
    });

    navigate("/new-test/test-detail");
  }

  return (
    <TestInfoContainer>
      <TestDetail>
        <DetailTitle>테스트 설명</DetailTitle>
        <DetailText>{testDetail.description}</DetailText>
      </TestDetail>

      <TestDetail>
        <DetailTitle>테스트 URL</DetailTitle>
        <DetailLink href={testDetail.testUrl} target="_blank">
          {testDetail.testUrl}
        </DetailLink>
      </TestDetail>

      <TestDetail>
        <DetailTitle>테스트 인원</DetailTitle>
        <DetailText>
          {testerEmails.map(({ testerEmail }, index) => (
            <div key={testerEmail}>{`${index + 1}. ${testerEmail}`}</div>
          ))}
        </DetailText>
      </TestDetail>

      <TestDetail>
        <DetailTitle>테스트 마감 날짜</DetailTitle>
        <DetailText>{formatDate(testDetail.deadline)}</DetailText>
      </TestDetail>

      <MissionContainer>
        <DetailTitle>미션 정보</DetailTitle>
        {missions.map((mission, index) => (
          <MissionDetail key={mission._id}>
            <MissionTitle>{`미션 ${index + 1}: ${mission.description}`}</MissionTitle>
            <MissionText>{`예상 소요 시간: ${mission.expectedDuration} 초`}</MissionText>
          </MissionDetail>
        ))}
      </MissionContainer>
      {isTestExpired && (
        <RecreateTestButton onClick={handleRecreateTest}>
          테스트 다시 만들기
        </RecreateTestButton>
      )}
    </TestInfoContainer>
  );
}

const TestInfoContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 700px;
  width: 100%;
`;

const TestDetail = styled.div`
  margin-bottom: 15px;
`;

const DetailTitle = styled.h3`
  color: #333;
  margin: 0 0 5px 0;
`;

const DetailText = styled.span`
  display: block;
  color: #555;
`;

const DetailLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MissionContainer = styled.div`
  margin-top: 20px;
`;

const MissionDetail = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #eef2f5;
  border-radius: 5px;
`;

const MissionTitle = styled.h4`
  color: #355e70;
  margin: 0;
`;

const MissionText = styled.p`
  color: #555;
  margin: 5px 0 0 0;
`;

const RecreateTestButton = styled.button`
  padding: 10px 20px;
  background-color: #355e70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

export default TestInfo;
