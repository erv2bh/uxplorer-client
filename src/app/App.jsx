import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboarding />} />
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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
