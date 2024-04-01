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
        {selectedTesterVideo && (
          <VideoButton
            onClick={() => window.open(selectedTesterVideo, "_blank")}
          >
            녹화영상 보기
          </VideoButton>
        )}
      </SelectContainer>
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
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
  width: 48%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const VideoButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const MissionDetail = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f2f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

const MissionTitle = styled.h4`
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
`;

const MissionText = styled.p`
  color: #555;
  margin-top: 4px;
  line-height: 1.6;
`;

export default UserResults;
