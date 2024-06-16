import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";

import styled from "styled-components";

import { testDetailAtom, missionAtom } from "../../atoms/atoms";

interface Mission {
  id: string;
  description: string;
  expectedDuration: string;
}

interface TestDetail {
  testName: string;
  testDescription: string;
  testUrl: string;
  testerEmails: string[];
  testDeadline: string;
}

function TestMissionForm() {
  const [missions, setMissions] = useAtom(missionAtom);
  const testDetail = useAtomValue<TestDetail>(testDetailAtom);
  const navigate = useNavigate();

  function addMission() {
    setMissions([
      ...missions,
      { id: crypto.randomUUID(), description: "", expectedDuration: "" },
    ]);
  }

  function removeMission(index: number) {
    if (missions.length > 3) {
      const updatedMissions = missions.filter((_, i) => i !== index);

      setMissions(updatedMissions);
    }
  }

  function handleMissionChange(index: number, type: keyof Mission, value: string) {
    const updatedMissions = missions.map((mission, i) => {
      if (i === index) {
        return { ...mission, [type]: value };
      }

      return mission;
    });

    setMissions(updatedMissions);
  }

  function isTestDetailsFilled(testDetails: TestDetail) {
    return (
      testDetails.testName.trim() !== "" &&
      testDetails.testDescription.trim() !== "" &&
      testDetails.testUrl.trim() !== "" &&
      testDetails.testerEmails.every((email) => email.trim() !== "") &&
      testDetails.testDeadline.trim() !== ""
    );
  }

  useEffect(() => {
    if (!isTestDetailsFilled(testDetail)) {
      navigate("/new-test/test-detail");
    }
  }, [navigate, testDetail]);

  function handleMovePrevious() {
    navigate("/new-test/test-detail");
  }
  function handleSubmit() {
    setMissions(missions);

    navigate("/new-test/submission-check");
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormContent>
        {missions.map((mission, index) => (
          <MissionGroup key={mission.id}>
            <FormGroup>
              <Label htmlFor={`description-${index}`}>미션 {index + 1}</Label>
              <Input
                id={`description-${index}`}
                type="text"
                placeholder="미션을 입력해주세요."
                value={mission.description}
                onChange={(e) =>
                  handleMissionChange(index, "description", e.target.value)
                }
              />
            </FormGroup>
            <EstimatedTimeGroup>
              <EstimatedTimeLabel htmlFor={`expectedDuration-${index}`}>
                예상 소요시간
              </EstimatedTimeLabel>
              <EstimatedTimeInput
                id={`expectedDuration-${index}`}
                type="number"
                placeholder="초"
                value={mission.expectedDuration}
                onChange={(e) =>
                  handleMissionChange(index, "expectedDuration", e.target.value)
                }
              />
            </EstimatedTimeGroup>
            {missions.length > 3 && (
              <RemoveButton type="button" onClick={() => removeMission(index)}>
                미션 제거
              </RemoveButton>
            )}
          </MissionGroup>
        ))}
      </FormContent>
      {missions.length < 3 && (
        <AlertMessage>미션을 최소 3개 이상 작성해주세요.</AlertMessage>
      )}
      <ButtonsContainer>
        <PreviousButton onClick={handleMovePrevious}>이전</PreviousButton>
        <Button type="button" onClick={addMission}>
          미션 추가
        </Button>
        <SubmitButton type="submit" disabled={missions.length < 3}>
          다음
        </SubmitButton>
      </ButtonsContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
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

const MissionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const EstimatedTimeGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EstimatedTimeLabel = styled.label`
  font-size: 16px;
  color: #355e70;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  color: #355e70;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const EstimatedTimeInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-left: 20px;
  width: 45px;
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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PreviousButton = styled(Button)`
  align-self: flex-start;
`;
const RemoveButton = styled(Button)`
  background-color: #cf4d22;

  &:hover {
    background-color: #9a0007;
  }
`;

const AlertMessage = styled.p`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

export default TestMissionForm;
