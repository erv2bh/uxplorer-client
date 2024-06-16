import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";
import styled from "styled-components";
import { testDetailAtom } from "../../atoms/atoms";

interface Email {
  id: number;
  value: string;
}

interface TestInputValues {
  testName: string;
  testDescription: string;
  testUrl: string;
  testDeadline: string;
}

function TestDetailForm() {
  const [testDetail, setTestDetail] = useAtom(testDetailAtom);
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [emails, setEmails] = useState<Email[]>([{ id: 1, value: "" }]);
  const [testInputValues, setTestInputValues] = useState<TestInputValues>({
    testName: "",
    testDescription: "",
    testUrl: "https://",
    testDeadline: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (testDetail.testerEmails && testDetail.testerEmails.length > 0) {
      setEmails(
        testDetail.testerEmails.map((email, index) => ({
          id: index + 1,
          value: email,
        })),
      );
      setParticipantCount(testDetail.testerEmails.length);
    } else {
      setEmails([{ id: 1, value: "" }]);
      setParticipantCount(1);
    }

    setTestInputValues({
      testName: testDetail.testName,
      testDescription: testDetail.testDescription,
      testUrl: testDetail.testUrl || "https://",
      testDeadline: testDetail.testDeadline,
    });
  }, [testDetail]);

  function isFormValid(): boolean {
    return (
      testInputValues.testName.trim() !== "" &&
      testInputValues.testDescription.trim() !== "" &&
      testInputValues.testUrl.trim() !== "" &&
      emails.every((email) => email.value.trim() !== "") &&
      testInputValues.testDeadline.trim() !== ""
    );
  }

  function handleParticipantChange(countChange: number) {
    const newCount = Math.max(1, participantCount + countChange);
    setParticipantCount(newCount);

    const newEmails = emails.slice(0, newCount);

    while (newEmails.length < newCount) {
      newEmails.push({ id: newEmails.length + 1, value: "" });
    }

    setEmails(newEmails);
  }

  function handleEmailChange(index: number, value: string) {
    const newEmails = [...emails];
    newEmails[index].value = value;

    setEmails(newEmails);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    if (name === "testUrl") {
      setTestInputValues((prev) => ({
        ...prev,
        [name]: value.startsWith("https://") ? value : `https://${  value}`,
      }));
    } else {
      setTestInputValues((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleCancel() {
    setTestDetail({
      testName: "",
      testDescription: "",
      testUrl: "https://",
      testerEmails: [],
      testDeadline: "",
    });

    navigate("/dashboard");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTestDetail({
      testName: testInputValues.testName,
      testDescription: testInputValues.testDescription,
      testUrl: testInputValues.testUrl,
      testerEmails: emails.map((email) => email.value),
      testDeadline: testInputValues.testDeadline,
    });

    navigate("/new-test/test-mission");
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormContent>
        <FormGroup>
          <Label htmlFor="testName">테스트 이름</Label>
          <Input
            id="testName"
            name="testName"
            type="text"
            placeholder="테스트 이름을 입력해주세요."
            value={testInputValues.testName || testDetail.testName || ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="testDescription">테스트 설명</Label>
          <TextArea
            id="testDescription"
            name="testDescription"
            placeholder="테스트 설명을 입력해주세요."
            value={
              testInputValues.testDescription ||
              testDetail.testDescription ||
              ""
            }
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="testUrl">테스트 URL</Label>
          <Input
            id="testUrl"
            name="testUrl"
            type="text"
            placeholder="테스트 URL을 입력해주세요."
            value={testInputValues.testUrl || testDetail.testUrl || "https://"}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>테스트 인원</Label>
          <ParticipantControl>
            <Button type="button" onClick={() => handleParticipantChange(-1)}>
              -
            </Button>
            <ParticipantCount>{participantCount}</ParticipantCount>
            <Button type="button" onClick={() => handleParticipantChange(1)}>
              +
            </Button>
          </ParticipantControl>
        </FormGroup>

        {emails.map((email, index) => (
          <FormGroup key={email.id}>
            <Label htmlFor={`email-${email.id}`}>이메일 주소 {index + 1}</Label>
            <Input
              id={`email-${email.id}`}
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email.value}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
          </FormGroup>
        ))}
        <FormGroup>
          <Label htmlFor="testDeadline">테스트 마감 날짜</Label>
          <Input
            id="testDeadline"
            name="testDeadline"
            type="date"
            value={
              testInputValues.testDeadline || testDetail.testDeadline || ""
            }
            onChange={handleInputChange}
          />
        </FormGroup>
      </FormContent>
      <ButtonsContainer>
        <CancelButton type="button" onClick={handleCancel}>
          취소
        </CancelButton>
        {!isFormValid() && (
          <AlertMessage>테스트 정보를 모두 입력해주세요.</AlertMessage>
        )}
        <SubmitButton type="submit" disabled={!isFormValid()}>
          다음
        </SubmitButton>
      </ButtonsContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const FormContent = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #355e70;
`;

const Input = styled.input`
  width: calc(100% - 30px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 30px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 120px;
  resize: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #355e70;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #133341;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #355e70;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #133341;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const AlertMessage = styled.span`
  color: #d32f2f;
  margin-right: 20px;
`;

const ParticipantControl = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantCount = styled.span`
  margin: 0 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;

export default TestDetailForm;
