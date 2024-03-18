import styled from "styled-components";

import PropTypes from "prop-types";

function WelcomeModal({ onStartTest }) {
  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>UXPLORIFY</ModalHeader>
        <ModalBody>
          <p>테스트 페이지에 오신 것을 환영합니다!</p>
          <p>안내창에 따라 미션을 진행해 주세요.</p>
          <p>문의사항이 있으면 남겨주세요.</p>
          <p>미션을 모두 완료 후 설문을 작성해주세요.</p>
        </ModalBody>
        <ModalFooter>
          <StartButton onClick={onStartTest}>시작하기</StartButton>
        </ModalFooter>
      </ModalContent>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
`;

const ModalHeader = styled.h2`
  color: #355e70;
  text-align: center;
`;

const ModalBody = styled.div`
  margin-top: 20px;
  color: #333;
  font-size: 16px;
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  background-color: #355e70;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

WelcomeModal.propTypes = {
  onStartTest: PropTypes.func.isRequired,
};

export default WelcomeModal;
