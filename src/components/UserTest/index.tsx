import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

import { useSetAtom } from "jotai";
import Header from "../Header";
import WelcomeModal from "../Modal/WelcomeModal";

import useGetAllMissions from "../../apis/useGetAllMissions";
import startScreenRecording from "../../utils/screenRecord";
import { screenRecorderAtom } from "../../atoms/atoms";
import SurveyNavigation from "../Navigation/SurveyNavigation";
import Loading from "../shared/Loading";

function UserTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const setRecorder = useSetAtom(screenRecorderAtom);
  const { data, isLoading } = useGetAllMissions();
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

    if (!testerId) {
      console.error("Tester ID is missing");
      return;
    }

    if (data && data.length > 0) {
      navigate(`/tester/${testerId}/mission/${data[0]}`);

      try {
        const recorderInstance = await startScreenRecording(testerId);
        if (recorderInstance) {
          setRecorder(recorderInstance);
        }
      } catch (error) {
        console.error("Screen recording could not be started", error);
      }
    } else {
      console.error("No missions available");
    }
  }

  if (isLoading) {
    return <Loading />;
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
