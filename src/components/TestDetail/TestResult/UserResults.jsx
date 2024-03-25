import { useState } from "react";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { testerDataAtom } from "../../../atoms/atoms";
import useGetTesterMissions from "../../../apis/useGetTesterMissions";

function UserResults() {
  const { testId } = useParams();
  const testerEmailsAndIds = useAtomValue(testerDataAtom);
  const [selectedTesterId, setSelectedTesterID] = useState("");
  const [selectedTesterVideo, setSelectedTesterVideo] = useState("");
  const { data: filteredMissionDetails, isLoading } = useGetTesterMissions(
    selectedTesterId,
    testId,
  );

  function handleSelectEmail(event) {
    const selectedTester = testerEmailsAndIds.find(
      (tester) => tester.testerEmail === event.target.value,
    );

    setSelectedTesterID(selectedTester?.testerId);
    setSelectedTesterVideo(selectedTester?.testerVideo);
  }

  return (
    <UserResultsContainer>
      <SelectContainer>
        <Select onChange={handleSelectEmail}>
          <option value="">테스터 선택</option>
          {testerEmailsAndIds.map(({ testerEmail }) => (
            <option key={testerEmail} value={testerEmail}>
              {testerEmail}
            </option>
          ))}
        </Select>
      </SelectContainer>
      {selectedTesterVideo && (
        <VideoButton onClick={() => window.open(selectedTesterVideo, "_blank")}>
          녹화영상 보기
        </VideoButton>
      )}
      {!isLoading &&
        filteredMissionDetails &&
        filteredMissionDetails.map((mission, index) => (
          <MissionDetail key={mission.missionId}>
            <MissionTitle>
              {`미션 ${index + 1}`}: {mission.description}
            </MissionTitle>
            <MissionText>
              완료 여부: {mission.completed ? "완료됨" : "미완료"}
            </MissionText>
            {mission.completed && (
              <>
                <MissionText>소요 시간: {mission.duration} 초</MissionText>
                <MissionText>
                  시작 시간: {new Date(mission.createdAt).toLocaleString()}
                </MissionText>
                <MissionText>
                  완료 시간: {new Date(mission.completedAt).toLocaleString()}
                </MissionText>
                <MissionText>
                  피드백: {mission.feedback ? mission.feedback : "없음"}
                </MissionText>
              </>
            )}
          </MissionDetail>
        ))}
    </UserResultsContainer>
  );
}

const UserResultsContainer = styled.div`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
`;

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
`;

const VideoButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
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

export default UserResults;
