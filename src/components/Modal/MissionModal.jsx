/* eslint-disable no-use-before-define */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import { useAtomValue } from "jotai";

import styled from "styled-components";

import useGetSingleMission from "../../apis/useGetSingleMission";

import { currentMission, testerMissionsDataAtom } from "../../atoms/atoms";

function MissionModal() {
  useGetSingleMission();

  const navigate = useNavigate();
  const { testerId, missionId } = useParams();

  const [feedback, setFeedback] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [missionTime, setMissionTime] = useState(0);
  const missionIds = useAtomValue(testerMissionsDataAtom);
  const data = useAtomValue(currentMission);
  const [position, setPosition] = useSpring(() => ({ x: 0, y: 0 }));

  const DraggableModal = animated(ModalContent);
  const currentMissionIndex = missionIds.findIndex((id) => id === missionId);

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bind = useDrag(({ offset }) => {
    setPosition({ x: offset[0], y: offset[1] });
  });

  function handleFeedbackChange(event) {
    setFeedback(event.target.value);
  }

  function handleFeedbackSubmit() {
    setIsFeedbackOpen(false);
  }

  function handleNextMission() {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex < missionIds.length) {
      const nextMissionId = missionIds[nextMissionIndex];
      setMissionTime(0);

      navigate(`/test/${testerId}/mission/${nextMissionId}`);
    }
  }

  function handleSkipMission() {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex < missionIds.length) {
      const nextMissionId = missionIds[nextMissionIndex];
      setMissionTime(0);

      navigate(`/test/${testerId}/mission/${nextMissionId}`);
    }
  }

  return (
    <ModalBackground>
      <DraggableModal style={{ x: position.x, y: position.y }} {...bind()}>
        <ModalHeader>
          <MissionIndex>
            {currentMissionIndex + 1} / {missionIds.length}
          </MissionIndex>
          <MissionTime>
            {Math.floor(missionTime / 60)
              .toString()
              .padStart(2, "0")}
            :{(missionTime % 60).toString().padStart(2, "0")}
          </MissionTime>
        </ModalHeader>
        <ModalBody>
          <p>{data?.description || "미션 설명"}</p>
          {isFeedbackOpen && (
            <FeedbackTextarea
              value={feedback}
              onChange={handleFeedbackChange}
            ></FeedbackTextarea>
          )}
        </ModalBody>
        <ModalFooter>
          {isFeedbackOpen ? (
            <FeedbackButton onClick={handleFeedbackSubmit}>저장</FeedbackButton>
          ) : (
            <FeedbackButton onClick={() => setIsFeedbackOpen(true)}>
              피드백
            </FeedbackButton>
          )}
          {data?.expectedDuration && missionTime > data.expectedDuration && (
            <SkipButton onClick={handleSkipMission}>건너뛰기</SkipButton>
          )}
          <NextButton onClick={handleNextMission}>다음</NextButton>
        </ModalFooter>
      </DraggableModal>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
`;

const ModalContent = styled(animated.div)`
  background-color: #a69e9e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  max-width: 600px;
  position: relative;
  cursor: grab;
  pointer-events: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  color: #355e70;
`;
const MissionIndex = styled.div`
  text-align: center;
`;

const MissionTime = styled.div``;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const FeedbackTextarea = styled.textarea`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  background-color: #f8f8f8;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #355e70;
    box-shadow:
      inset 0 1px 3px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(53, 94, 112, 0.6);
    outline: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const buttonStyle = `
  background-color: #355e70;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #133341;
  }
`;

const FeedbackButton = styled.button`
  ${buttonStyle}
`;
const SkipButton = styled.button`
  ${buttonStyle}
`;
const NextButton = styled.button`
  ${buttonStyle}
`;

export default MissionModal;
