import styled from "styled-components";

import useGetTestURL from "../../apis/useGetTestURL";

function TestExecution() {
  const { testUrl } = useGetTestURL();

  return (
    <Container>
      <Frame src={testUrl} title="Test Execution Frame"></Frame>
    </Container>
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
