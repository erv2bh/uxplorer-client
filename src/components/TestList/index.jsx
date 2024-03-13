import styled from "styled-components";

function TestList() {
  const tests = [];

  return (
    <Container>
      {tests.length > 0 ? (
        tests.map((test) => (
          <TestCard key={test.id}>
            <h3>{test.name}</h3>
            <p>{test.url}</p>
            <p>{test.headCount}</p>
            <p>{test.completedAt}</p>
            <p>{test.isProgressing.toString()}</p>
          </TestCard>
        ))
      ) : (
        <NoTestsMessage>테스트 목록이 비어있습니다.</NoTestsMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 4em 15em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4em;
`;

const TestCard = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const NoTestsMessage = styled.p`
  text-align: center;
  color: #999;
`;

export default TestList;
