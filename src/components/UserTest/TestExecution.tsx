import { Outlet } from "react-router-dom";

import styled from "styled-components";

import useGetTestURL from "../../apis/useGetTestURL";
import Loading from "../shared/Loading";

function TestExecution() {
  const { testUrl, isLoading } = useGetTestURL();

  if (isLoading) return <Loading />;

  return (
    <>
      <Container>
        <Frame src={testUrl} title="Test Execution Frame"></Frame>
      </Container>
      <Outlet />
    </>
  );
}

const Container = styled.div`
  text-align: center;
  overflow: hidden;
`;

const Frame = styled.iframe`
  width: 100vw;
  height: calc(100vh - 50px);
  border: none;
`;

export default TestExecution;
