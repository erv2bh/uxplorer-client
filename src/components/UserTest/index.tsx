import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

import { useSetAtom } from "jotai";
import Header from "../Header";
import WelcomeModal from "../Modal/WelcomeModal";

import useGetAllMissions from "../../apis/useGetAllMissions";
import startScreenRecording from "../../utils/screenRecord";
import { screenRecorderAtom } from "../../atoms/atoms";
import SurveyNavigation from "../Navigation/SurveyNavigation";

function UserTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const setRecorder = useSetAtom(screenRecorderAtom);
  const { data } = useGetAllMissions();
  const { testerId } = useParams();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const isSurveyPage = location.pathname === `/tester/${testerId}/survey`;

  useEffect(() => {
    const isTestStarted = localStorage.getItem("isTestStarted");

    if (!isTestStarted) {
      setShowWelcomeModal(true);
    }
  }, []);

  async function handleStartTest() {
    setShowWelcomeModal(false);
    localStorage.setItem("isTestStarted", "true");
    navigate(`/tester/${testerId}/mission/${data[0]}`);

    try {
      const recorderInstance = await startScreenRecording(testerId);

      setRecorder(recorderInstance);
    } catch (error) {
      console.error("Screen recording could not be started", error);
    }
  }

  return (
    <>
      <Header />
      {showWelcomeModal && <WelcomeModal onStartTest={handleStartTest} />}
      {isSurveyPage && <SurveyNavigation />}
      <Outlet />
    </>
  );
}

export default UserTest;
