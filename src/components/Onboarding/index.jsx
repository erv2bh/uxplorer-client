import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import usePostGoogleLogin from "../../apis/usePostGoogleLogin";
import Loading from "../shared/Loading";

function Onboarding() {
  const navigate = useNavigate();
  const { fetchGoogleLogin, isPending } = usePostGoogleLogin();

  if (isPending) return <Loading />;

  return (
    <Container>
      <LogoContainer>
        <Logo src="/assets/uxplorer-logo.png" alt="UXplorer Logo" />
      </LogoContainer>
      <ButtonContainer>
        <Button onClick={() => fetchGoogleLogin()}>기업 로그인</Button>
        <Button onClick={() => navigate("/login")}>테스터 로그인</Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Logo = styled.img`
  max-width: 300px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #6f6fff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #5a5ae0;
  }
`;

export default Onboarding;
