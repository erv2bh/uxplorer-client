import { Routes, Route } from "react-router-dom";
import Onboarding from "../components/Onboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
