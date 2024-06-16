import { useLocation } from "react-router-dom";

import styled from "styled-components";

function NewTestNavigation() {
  const location = useLocation();

  const isHighlight = (pathSegment: string) => !!location.pathname.includes(pathSegment);

  return (
    <Nav>
      <Text $isHighlight={isHighlight("test-detail")}>테스트 정보</Text>
      <Separator>&gt;</Separator>
      <Text $isHighlight={isHighlight("test-mission")}>테스트 미션</Text>
      <Separator>&gt;</Separator>
      <Text $isHighlight={isHighlight("submission-check")}>최종 확인</Text>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  height: 40px;
`;

interface TextSpan {
  $isHighlight: Boolean;
}

const Text = styled.span<TextSpan>`
  margin: 0 10px;
  color: ${({ $isHighlight }) => ($isHighlight ? "#133341" : "#355e70")};
  font-weight: ${({ $isHighlight }) => ($isHighlight ? "bold" : "normal")};
  font-size: 30px;
`;

const Separator = styled.span`
  margin: 0 5px;
  font-size: 30px;
`;

export default NewTestNavigation;
