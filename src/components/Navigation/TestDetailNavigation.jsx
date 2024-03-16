import { useAtomValue } from "jotai";

import styled from "styled-components";

import { currentTestTitleAtom } from "../../atoms/atoms";

function TestDetailNavigation() {
  const testTitle = useAtomValue(currentTestTitleAtom);

  return (
    <Nav>
      <Text>{testTitle}</Text>
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

const Text = styled.span`
  color: #133341;
  font-weight: bold;
  font-size: 50px;
`;

export default TestDetailNavigation;
