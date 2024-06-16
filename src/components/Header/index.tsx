import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogout from "../../apis/usePostLogout";
import Loading from "../shared/Loading";

function Header() {
  const navigate = useNavigate();
  const { fetchLogout, isPending } = useLogout();

  if (isPending) return <Loading />;

  return (
    <StyledHeader>
      <Logo
        src="/assets/uxplorer-text-logo.png"
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />
      <LogoutButton onClick={() => fetchLogout()}>로그아웃</LogoutButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  height: 50px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #355e70;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  height: 50px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

export default Header;
