import { useState } from "react";
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
import useDeleteTest from "../../apis/useDeleteTest";
import Loading from "../shared/Loading";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";

function TestInfo() {
  const navigate = useNavigate();
  const { fetchDeleteTest, isPending } = useDeleteTest();
  const setTestDetail = useSetAtom(testDetailAtom);
  const testDetail = useAtomValue(currentTestDataAtom);
  const testerEmails = useAtomValue(testerDataAtom);
  const missions = useAtomValue(missionsDataAtom);
  const [showModal, setShowModal] = useState(false);

  const isTestExpired = new Date(testDetail.deadline) < new Date();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function confirmDelete() {
    fetchDeleteTest();
    closeModal();
  }

  function handleRecreateTest() {
    setTestDetail({
      testName: testDetail.title,
      testDescription: testDetail.description,
      testUrl: testDetail.testUrl,
      testDeadline: "",
    });

    navigate("/new-test/test-detail");
  }

  if (isPending) return <Loading />;

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
      <ButtonContainer>
        {isTestExpired && (
          <RecreateTestButton onClick={handleRecreateTest}>
            테스트 다시 만들기
          </RecreateTestButton>
        )}
        <DeleteTestButton onClick={openModal}>삭제하기</DeleteTestButton>
      </ButtonContainer>
      <DeleteConfirmModal
        isOpen={showModal}
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />
    </TestInfoContainer>
  );
}

const TestInfoContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 24px auto;
  max-width: 700px;
  width: 100%;
`;

const TestDetail = styled.div`
  margin-bottom: 20px;
`;

const DetailTitle = styled.h3`
  color: #334e68;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const DetailText = styled.span`
  display: block;
  color: #556789;
  font-size: 16px;
`;

const DetailLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MissionContainer = styled.div`
  margin-top: 24px;
`;

const MissionDetail = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #eef2f5;
  border-radius: 8px;
`;

const MissionTitle = styled.h4`
  color: #2b5876;
  margin: 0 0 5px 0;
  font-weight: 500;
`;

const MissionText = styled.p`
  color: #556789;
  margin: 5px 0 0 0;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const RecreateTestButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #43a047;
  }
`;

const DeleteTestButton = styled(Button)`
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;

export default TestInfo;
