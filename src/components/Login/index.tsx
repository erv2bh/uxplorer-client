import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";

import styled from "styled-components";

import usePostTesterLogin from "../../apis/usePostTesterLogin";

import { errorMessageAtom } from "../../atoms/atoms";
import Loading from "../shared/Loading";

function Login() {
  const navigate = useNavigate();
  const { fetchTesterLogin, isPending } = usePostTesterLogin();
  const [testerId, setTesterId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  if (isPending) return <Loading />

  function handleTesterIdChange(event: ChangeEvent<HTMLInputElement>) {
    setTesterId(event.target.value);
    setErrorMessage("");
  }

  function handleTesterPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setErrorMessage("");
  }

  function handleNavigateBack() {
    setErrorMessage("");
    navigate("/");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetchTesterLogin({ id: testerId, password });
  }

  return (
    <Container>
      <LogoContainer>
        <Logo src="/assets/uxplorer-logo.png" alt="UXplorer Logo" />
      </LogoContainer>
      <FormContainer as="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="테스터 아이디"
          value={testerId}
          onChange={handleTesterIdChange}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleTesterPasswordChange}
        />
        <Button type="submit">로그인</Button>
        <Button onClick={handleNavigateBack}>돌아가기</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
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

const FormContainer = styled.div`
  margin-top: 30px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 130px;
`;

const Button = styled.button`
  background-color: #6f6fff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #5a5ae0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default Login;
