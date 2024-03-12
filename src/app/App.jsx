import { Routes, Route } from "react-router-dom";
import Onboarding from "../components/Onboarding";
import Dashboard from "../components/Dashboard";

import GlobalStyle from "../components/Styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
