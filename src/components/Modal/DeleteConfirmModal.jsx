import styled from "styled-components";
import PropTypes from "prop-types";

function DeleteConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <p>정말 삭제하시겠습니까?</p>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
          <CancelButton onClick={onCancel}>아니오</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 10px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #355e70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d9534f;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #355e70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #133341;
  }
`;

DeleteConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
