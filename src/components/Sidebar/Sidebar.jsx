import styled from "styled-components";

import { useParams, useLocation, NavLink } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const { testId } = useParams();

  const isPathActive = (path) => location.pathname.includes(path);

  return (
    <SidebarContainer>
      <SidebarItem
        to={`/test/${testId}/test-info`}
        activeClassName={
          isPathActive(`/test/${testId}/test-info`) ? "active" : ""
        }
      >
        테스트 정보
      </SidebarItem>
      <SidebarItem
        to={`/test/${testId}/test-result/user-results`}
        activeClassName={
          isPathActive(`/test/${testId}/test-result`) ? "active" : ""
        }
      >
        테스트 결과
      </SidebarItem>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: #f5f5f5;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarItem = styled(NavLink)`
  padding: 10px 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #333;
  text-decoration: none;
  font-size: 25px;
  text-align: center;

  &.active {
    color: #fff;
    background-color: #355e70;
  }

  &:hover {
    color: #fff;
    background-color: #133341;
  }
`;
export default Sidebar;
