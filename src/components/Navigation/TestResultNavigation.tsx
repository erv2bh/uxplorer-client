import { NavLink, useParams } from "react-router-dom";

import styled from "styled-components";

function TestResultNavigation() {
  const { testId } = useParams();

  return (
    <NavigationContainer>
      <StyledNavLink to={`/test/${testId}/test-result/total-results`}>
        통합 결과
      </StyledNavLink>
      <StyledNavLink to={`/test/${testId}/test-result/user-results`}>
        유저별 결과
      </StyledNavLink>
    </NavigationContainer>
  );
}

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledNavLink = styled(NavLink)`
  padding: 10px 20px;
  margin: 0 10px;
  text-decoration: none;
  color: #000000;
  font-size: 20px;

  &.active {
    font-weight: bold;
    color: #002766;
  }
`;

export default TestResultNavigation;
