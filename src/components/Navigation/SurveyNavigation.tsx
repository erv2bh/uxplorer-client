import styled from "styled-components";

function SurveyNavigation() {
  return (
    <NavWrapper>
      <SurveyText>
        저희 웹사이트를 테스트 해주셔서 감사합니다!
        <br />
        간단한 설문을 끝으로 테스트를 마치겠습니다.
      </SurveyText>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  height: auto;
`;

const SurveyText = styled.div`
  text-align: center;
  color: #133341;
  font-weight: normal;
  font-size: 20px;
  margin: 0 10px;
`;

export default SurveyNavigation;
