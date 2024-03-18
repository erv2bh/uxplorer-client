import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header";
import WelcomeModal from "../Modal/WelcomeModal";

import useGetAllMissions from "../../apis/useGetAllMissions";

function UserTest() {
  const navigate = useNavigate();
  const { data } = useGetAllMissions();
  const { testerId } = useParams();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const isTestStarted = localStorage.getItem("isTestStarted");

    if (!isTestStarted) {
      setShowWelcomeModal(true);
    }
  }, []);

  function handleStartTest() {
    setShowWelcomeModal(false);
    localStorage.setItem("isTestStarted", "true");
    navigate(`/test/${testerId}/mission/${data[0]}`);
  }

  return (
    <>
      <Header />
      {showWelcomeModal && <WelcomeModal onStartTest={handleStartTest} />}
      <Outlet />
    </>
  );
}

export default UserTest;
