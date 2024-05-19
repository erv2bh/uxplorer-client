import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import usePostGoogleLogin from "../../apis/usePostGoogleLogin";
import Loading from "../shared/Loading";

function Onboarding() {
  const navigate = useNavigate();
  const { fetchGoogleLogin, isPending } = usePostGoogleLogin();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <MobileContainer>
        <Logo src="/assets/uxplorer-logo.png" alt="UXplorer Logo" />
        <MobileMessage>
          <p>본 어플리케이션은 PC 환경에 최적화 되어 있습니다.</p>
          <p>모바일 환경에서는 원활한 사용이 어려우니 PC로 접속 바랍니다.</p>
        </MobileMessage>
        <ReadmeLink href="https://github.com/erv2bh/uxplorer-client">
          리드미 읽으러 가기
        </ReadmeLink>
      </MobileContainer>
    );
  }

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

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

const MobileMessage = styled.div`
  font-size: 18px;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ReadmeLink = styled.a`
  color: #6f6fff;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export default Onboarding;
