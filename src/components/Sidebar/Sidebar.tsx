import styled from "styled-components";

import { useParams, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { testId } = useParams();

  function isHighlight(pathSegment: string) {
    return location.pathname.includes(`/test/${testId}/${pathSegment}`);
  }

  function navigateTo(path: string) {
    return navigate(path);
  }

  return (
    <Nav>
      <Text
        $isHighlight={isHighlight("test-info")}
        onClick={() => navigateTo(`/test/${testId}/test-info`)}
      >
        테스트 정보
      </Text>
      <Text
        $isHighlight={isHighlight("test-result")}
        onClick={() => navigateTo(`/test/${testId}/test-result/total-results`)}
      >
        테스트 결과
      </Text>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
  min-width: 200px;
`;

interface TextProps {
  $isHighlight: boolean;
}

const Text = styled.div<TextProps>`
  padding: 10px 20px;
  margin: 15px 0;
  color: ${({ $isHighlight }) => ($isHighlight ? "#fff" : "#333")};
  background-color: ${({ $isHighlight }) =>
    $isHighlight ? "#355e70" : "transparent"};
  font-size: 25px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #133341;
  }
`;

export default Sidebar;
