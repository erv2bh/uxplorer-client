import { useState } from "react";

import Header from "../Header";
import WelcomeModal from "../Modal/WelcomeModal";
import TestExecution from "./TestExecution";

function UserTest() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  function handleStartTest() {
    setShowWelcomeModal(false);
  }

  return (
    <>
      <Header />
      {showWelcomeModal && <WelcomeModal onStartTest={handleStartTest} />}
      <TestExecution />
    </>
  );
}

export default UserTest;
