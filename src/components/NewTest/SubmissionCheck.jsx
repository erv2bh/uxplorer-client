import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";

import styled from "styled-components";

import {
  testDetailAtom,
  missionAtom,
  errorMessageAtom,
} from "../../atoms/atoms";

import usePostTest from "../../apis/usePostTest";
import Loading from "../shared/Loading";

function SubmissionCheck() {
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const missions = useAtomValue(missionAtom);
  const testDetail = useAtomValue(testDetailAtom);
  const { saveTestWithMissions, loading } = usePostTest();
  const navigate = useNavigate();

  useEffect(() => {
    const hasEmptyValue = missions.some(
      (missionDetail) =>
        missionDetail.id.trim() === "" ||
        missionDetail.description.trim() === "" ||
        missionDetail.expectedDuration.toString().trim() === "",
    );

    if (hasEmptyValue || missions.length < 3) {
      navigate("/new-test/test-mission");
    }
  }, [missions, navigate]);

  function handleMovePrevious() {
    setErrorMessage("");
    navigate("/new-test/test-mission");
  }

  if (loading) return <Loading />;

  return (
    <FormContainer>
      <FormContent>
        <h2>테스트 세부 정보 확인</h2>

        <FormGroup>
          <Label>테스트 이름:</Label>
          <div>{testDetail.testName}</div>
        </FormGroup>
        <FormGroup>
          <Label>테스트 설명:</Label>
          <div>{testDetail.testDescription}</div>
        </FormGroup>
        <FormGroup>
          <Label>테스트 URL:</Label>
          <div>{testDetail.testUrl}</div>
        </FormGroup>
        <FormGroup>
          <Label>테스터 이메일:</Label>
          <StyledList>
            {testDetail.testerEmails.map((email, index) => (
              <ListItem key={email}>{`${index + 1}. ${email}`}</ListItem>
            ))}
          </StyledList>
        </FormGroup>
        <FormGroup>
          <Label>테스트 마감일:</Label>
          <div>{testDetail.testDeadline}</div>
        </FormGroup>

        <h2>미션 정보 확인</h2>
        {missions.map((missionDetail, index) => (
          <FormGroup key={missionDetail.id}>
            <FormGroup>
              <Label>미션 {index + 1}:</Label>
              <div>{missionDetail.description}</div>
            </FormGroup>
            <FormGroup>
              <Label>예상 소요시간:</Label>
              <div>{missionDetail.expectedDuration} 초</div>
            </FormGroup>
          </FormGroup>
        ))}
      </FormContent>
      <ButtonsContainer>
        <PreviousButton onClick={handleMovePrevious}>이전</PreviousButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SubmitButton onClick={() => saveTestWithMissions()}>생성</SubmitButton>
      </ButtonsContainer>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const FormContent = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  color: #355e70;
  font-weight: 600;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #355e70;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
`;

const PreviousButton = styled(Button)`
  align-self: flex-start;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default SubmissionCheck;
