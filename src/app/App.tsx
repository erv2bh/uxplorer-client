import { Routes, Route, Navigate } from "react-router-dom";

import { useAtomValue } from "jotai";
import { testerAtom, userAtom } from "../atoms/atoms";

import Onboarding from "../components/Onboarding";
import Dashboard from "../components/Dashboard";

import GlobalStyle from "../components/Styles";
import NewTest from "../components/NewTest";
import TestDetailForm from "../components/NewTest/TestDetailForm";
import TestMissionForm from "../components/NewTest/TestMissionForm";
import SubmissionCheck from "../components/NewTest/SubmissionCheck";
import TestDetail from "../components/TestDetail";
import TestInfo from "../components/TestDetail/TestInfo";
import TestResult from "../components/TestDetail/TestResult";
import UserResults from "../components/TestDetail/TestResult/UserResults";
import TotalResults from "../components/TestDetail/TestResult/TotalResult";
import Login from "../components/Login";
import UserTest from "../components/UserTest";
import TestExecution from "../components/UserTest/TestExecution";
import MissionModal from "../components/Modal/MissionModal";
import Survey from "../components/UserTest/Survey";

function App() {
  const user = useAtomValue(userAtom);
  const tester = useAtomValue(testerAtom);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-test" element={<NewTest />}>
              <Route path="test-detail" element={<TestDetailForm />} />
              <Route path="test-mission" element={<TestMissionForm />} />
              <Route path="submission-check" element={<SubmissionCheck />} />
            </Route>
            <Route path="/test/:testId" element={<TestDetail />}>
              <Route path="test-info" element={<TestInfo />} />
              <Route path="test-result" element={<TestResult />}>
                <Route path="user-results" element={<UserResults />} />
                <Route path="total-results" element={<TotalResults />} />
              </Route>
            </Route>
          </>
        )}
        {tester && (
          <Route path="/test/:testerId" element={<UserTest />}>
            <Route path="mission" element={<TestExecution />}>
              <Route path=":missionId" element={<MissionModal />} />
            </Route>
            <Route path="survey" element={<Survey />} />
          </Route>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
