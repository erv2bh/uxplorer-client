import { Link } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import styled from "styled-components";

import { currentTestIdAtom, searchQueryAtom } from "../../atoms/atoms";

import useGetAllTests from "../../apis/useGetAllTests";
import formatDate from "../../utils/formatDate";
import Loading from "../shared/Loading";

interface Test {
  _id: string;
  title: string;
  testUrl: string;
  testers: { email: string }[];
  deadline: string;
}

function TestList() {
  const searchQuery = useAtomValue(searchQueryAtom);
  const setCurrentTestId = useSetAtom(currentTestIdAtom);
  const { createdTests, isLoading } = useGetAllTests();

  const filteredTests = createdTests?.filter((test: Test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const shouldShowFilteredTest = searchQuery && filteredTests && filteredTests?.length > 0;
  const testsToShow = shouldShowFilteredTest ? filteredTests : createdTests;

  function switchTest(clickedTestId: string) {
    setCurrentTestId(clickedTestId);
  }

  function hasDeadlinePassed(deadline: string) {
    const today = new Date();
    const deaelineData = new Date(deadline);

    return deaelineData < today;
  }

  if (isLoading) return <Loading />;

  return (
    <Container>
      {testsToShow && testsToShow?.length > 0 ? (
        testsToShow.map((test) => (
          <TestCard
            key={test._id}
            as={Link}
            to={`/test/${test._id}/test-info`}
            onClick={() => switchTest(test._id)}
          >
            <h3>{test.title}</h3>
            <p>{test.testUrl}</p>
            <p>{test.testers.length}명</p>
            <p>{formatDate(test.deadline)}</p>
            <p>
              {hasDeadlinePassed(test.deadline) ? (
                <span style={{ color: "#ff0000", marginLeft: "10px" }}>
                  종료됨
                </span>
              ) : (
                <span style={{ color: "#355e70", marginLeft: "10px" }}>
                  진행중
                </span>
              )}
            </p>
          </TestCard>
        ))
      ) : (
        <NoTestsMessage>테스트 목록이 비어있습니다.</NoTestsMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 4em 10em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2em;
  justify-content: center;
`;

const TestCard = styled(Link)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  color: inherit;
  text-decoration: none;
  width: 200px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;

  h3,
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const NoTestsMessage = styled.p`
  text-align: center;
  color: #999;
`;

export default TestList;
