import { FormEvent, LabelHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import usePostSurveys from "../../apis/usePostSurveys";

import CONSTANT from "../../constants/constant";
import Loading from "../shared/Loading";

function Survey() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(
    Array(CONSTANT.surveyQuestions.length).fill(null),
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const { saveSurveyData, isPending } = usePostSurveys();

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = optionIndex;
    setResponses(updatedResponses);
  };

  const isAllQuestionsAnswered =
    responses.every((response) => response !== null) && npsScore;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (isAllQuestionsAnswered) {
      const surveyResults = {
        susScore: responses.map((response) => response + 1),
        npsScore,
      };

      saveSurveyData(surveyResults);
      localStorage.clear();
      navigate("/");
    }
  };

  if (isPending) return <Loading />;

  return (
    <SurveyContainer>
      <form onSubmit={handleSubmit}>
        <QuestionList>
          {CONSTANT.surveyQuestions.map((question, index) => (
            <QuestionItem key={question}>
              <QuestionLabel>
                {index + 1}. {question}
              </QuestionLabel>
              <OptionsContainer>
                {CONSTANT.surveyOptions.map((option, optionIndex) => (
                  <OptionLabel key={option}>
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value={option}
                      checked={responses[index] === optionIndex}
                      onChange={() => handleOptionChange(index, optionIndex)}
                    />
                    {option}
                  </OptionLabel>
                ))}
              </OptionsContainer>
            </QuestionItem>
          ))}
        </QuestionList>
        <NpsContainer>
          <NpsLabel>
            이 서비스를 다른 사람에게 추천할 의향이 얼마나 있습니까? (0에서
            10까지)
          </NpsLabel>
          <NpsOptions>
            {Array.from({ length: 11 }, (_, i) => (
              <NpsOptionLabel key={i} $isSelected={npsScore === i}>
                <input
                  type="radio"
                  name="npsScore"
                  value={i}
                  checked={npsScore === i}
                  onChange={() => setNpsScore(i)}
                />
                {i}
              </NpsOptionLabel>
            ))}
          </NpsOptions>
        </NpsContainer>
        {submitAttempted && !isAllQuestionsAnswered && (
          <span>모든 설문 문항을 답해주세요.</span>
        )}
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </SurveyContainer>
  );
}

const SurveyContainer = styled.div`
  background: #f7f7f7;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionList = styled.ol`
  list-style: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  margin-bottom: 1rem;
`;

const QuestionLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.2rem;
`;

const OptionLabel = styled.label`
  display: block;
  background: #fff;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const NpsContainer = styled.div`
  margin-top: 2rem;
`;

const NpsLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const NpsOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface NpsOptionLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  $isSelected: boolean;
}

const NpsOptionLabel = styled.label<NpsOptionLabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 2px;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    `
      background: #0044cc;
      color: #fff;
      border-color: #0044cc;
    `}

  &:hover {
    background: #f0f0f0;
  }

  input[type="radio"] {
    display: none;
  }
`;

const SubmitButton = styled.button`
  background: #0044cc;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background: #003399;
  }
`;

export default Survey;
