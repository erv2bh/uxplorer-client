import { useState } from "react";

import styled from "styled-components";

import usePostTesterLogin from "../../apis/usePostTesterLogin";

function Login() {
  const fetchTesterLogin = usePostTesterLogin();
  const [testerId, setTesterId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchTesterLogin({ id: testerId, password });
  };

  return (
    <Container>
      <Logo src="/assets/uxplorer-logo.png" alt="UXplorer Logo" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="테스터 아이디"
          value={testerId}
          onChange={(e) => setTesterId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </Form>
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
  margin-bottom: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

export default Login;
