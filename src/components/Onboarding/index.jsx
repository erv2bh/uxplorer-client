import styled from "styled-components";

function Onboarding() {
  return (
    <Container>
      <Logo src="/assets/uxplorer-logo.png" alt="UXplorer Logo" />
      <Button>기업 로그인</Button>
      <Button>테스터 로그인</Button>
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

const Logo = styled.img`
  max-width: 300px;
  margin-bottom: 50px;
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
