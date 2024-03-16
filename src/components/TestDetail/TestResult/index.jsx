import { Outlet } from "react-router-dom";

import TestResultNavigation from "../../Navigation/TestResultNavigation";

function TestResult() {
  return (
    <>
      <TestResultNavigation />
      <Outlet />
    </>
  );
}

export default TestResult;
