import { Outlet } from "react-router-dom";

import styled from "styled-components";

import Header from "../Header";
import TestDetailNavigation from "../Navigation/TestDetailNavigation";
import Sidebar from "../Sidebar/Sidebar";

import useGetSingleTest from "../../apis/useGetSingleTest";

function TestDetail() {
  useGetSingleTest();

  return (
    <>
      <Header />
      <TestDetailNavigation />
      <LayoutContainer>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </LayoutContainer>
    </>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  height: 80%;
  overflow-y: auto;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default TestDetail;
