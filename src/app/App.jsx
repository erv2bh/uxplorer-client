import { Routes, Route } from "react-router-dom";
import Onboarding from "../components/Onboarding";
import Dashboard from "../components/Dashboard";

import GlobalStyle from "../components/Styles";
import NewTest from "../components/NewTest";
import TestDetail from "../components/NewTest/TestDetail";
import TestMission from "../components/NewTest/TestMission";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-test" element={<NewTest />}>
          <Route path="test-detail" element={<TestDetail />} />
          <Route path="test-mission" element={<TestMission />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
