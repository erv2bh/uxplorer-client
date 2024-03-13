import { Outlet } from "react-router-dom";

import Header from "../Header";
import NewTestNavigation from "../Navigation/NewTestNavigation";

function NewTest() {
  return (
    <>
      <Header />
      <NewTestNavigation />
      <Outlet />
    </>
  );
}

export default NewTest;
