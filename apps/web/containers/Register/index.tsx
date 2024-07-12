'use client';

import cx from 'classnames';
import { ChangeEvent, useState } from 'react';

import { CONTENT_TYPE } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { ContentType, IQuestion } from '@/types';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';

interface ContentData {
  title: string;
  content: string;
  imageUrls: { index: number; imageUrl: File | null }[];
  type: ContentType;
}

interface ResultData {
  result: string;
  title: string;
  content: string;
}

const SCORE_OPTIONS = [-1, 1];
const MBTI_RESULT_TYPE = [
  'ENFJ',
  'ENFP',
  'ENTJ',
  'ENTP',
  'ESFJ',
  'ESFP',
  'ESTJ',
  'ESTP',
  'INFJ',
  'INFP',
  'INTJ',
  'INTP',
  'ISFJ',
  'ISFP',
  'ISTJ',
  'ISTP',
];
const MBTI_QUESTIONS_TYPE = [
  ['I', 'E'],
  ['S', 'N'],
  ['F', 'T'],
  ['P', 'J'],
];

export default function Register() {
  const [data, setData] = useState<ContentData>({
    type: 'MBTI',
    title: '',
    content: '',
    imageUrls: [],
  });

  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      index: 0,
      question: '',
      answers: [
        {
          score: 0,
          text: '',
        },
      ],
    },
  ]);

  const [results, setResults] = useState<ResultData[]>([
    {
      result: '',
      title: '',
      content: '',
    },
  ]);

  const handleInputChange = (value: string | number, field: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] ?? null;
    const updateImageUrls = [...data.imageUrls];
    updateImageUrls[index] = { index, imageUrl: file };
    setData((prevData) => ({ ...prevData, imageUrls: updateImageUrls }));
  };

  const handleQuestionChange = (index: number, field: string, value: string | number) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  };

  const handleAnswerChange = (
    qIndex: number,
    aIndex: number,
    field: string,
    value: string | number,
  ) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex) {
        const updatedAnswers = q.answers.map((a, j) =>
          j === aIndex ? { ...a, [field]: value } : a,
        );
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    setResults(results.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };
  const getSelectedValues = () => results.map((result) => result.result);

  const addQuestion = () => {
    const newQuestion: IQuestion = {
      index: 0,
      question: '',
      answers: [{ score: 0, text: '' }],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const addAnswer = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question, i) => {
        if (i === index) {
          const updatedQuestion = {
            ...question,
            answers: [...question.answers, { score: 0, text: '' }],
          };
          return updatedQuestion;
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  const addResult = () =>
    setResults([
      ...results,
      {
        result: '',
        title: '',
        content: '',
      },
    ]);

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAnswer = (qIndex: number, aIndex: number) => {
    setQuestions((prev) =>
      prev.map((question, i) => {
        if (i === qIndex) {
          return {
            ...question,
            answers: question.answers.filter((_, j) => j !== aIndex),
          };
        }
        return question;
      }),
    );
  };

  const removeResult = (index: number) => {
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const headers = getHeaders();

    const checkOddCountIndices = () => {
      const indexCount = questions.reduce((acc, { index }) => {
        if (typeof acc[index] === 'undefined') {
          acc[index] = 0;
        }
        acc[index] += 1;
        return acc;
      }, [] as Array<number>);

      const oddIndices = indexCount.filter((count) => count % 2 !== 0);

      return oddIndices.length === 4;
    };

    if (data.type === 'MBTI' && questions.length < 4 && results.length !== 16)
      return alert('MBTI의 질문은 최소 4개 이상, 결과는 16개로 작성해주세요!');

    if (!checkOddCountIndices()) {
      return alert('각 질문의 점수의 합이 0이 되지 않도록 홀 수로 작성해 주세요!');
    }

    formData.append('type', data.type);
    formData.append('title', data.title);
    formData.append('content', data.content);

    data!.imageUrls.forEach((image: { index: number; imageUrl: File | null }) => {
      if (image.imageUrl instanceof File) {
        formData.append(`imageUrls`, image.imageUrl);
      }
    });

    formData.append('questions', JSON.stringify(questions));
    formData.append('results', JSON.stringify(results));

    try {
      const response = await apiBe.post('/v1/contents', formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return (
    <form className={styles.formWrap} onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        <p>카테고리</p>
        <select
          name="type"
          defaultValue={data.type}
          onChange={(e) => handleInputChange(e.target.value, 'type')}
        >
          {CONTENT_TYPE.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        <p>제목</p>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => handleInputChange(e.target.value, 'title')}
          required
        />
      </label>

      <label>
        <p>설명</p>
        <input
          type="text"
          name="content"
          value={data.content}
          onChange={(e) => handleInputChange(e.target.value, 'content')}
          required
        />
      </label>

      <label>
        <p>대표 이미지</p>
        <input
          type="file"
          name="image"
          className={styles.inputFile}
          accept="image/*"
          onChange={(e) => handleFileChange(e, 0)}
          required
        />
      </label>

      <div className={styles.containerWrap}>
        <h3>Questions ( total : {questions.length} )</h3>

        {questions.map((question, i) => (
          <div key={`question + ${i}`} className={cx(styles.labelBox, styles.questionLabelBox)}>
            {data.type === 'MBTI' && (
              <label>
                <p>질문 타입</p>
                <select
                  name="type"
                  value={question.index}
                  className="yellow"
                  onChange={(e) => handleQuestionChange(i, 'index', parseInt(e.target.value, 10))}
                >
                  {MBTI_QUESTIONS_TYPE.map((option, index) => (
                    <option key={`${option[0]}/${option[1]}`} value={index}>
                      {`${option[0]} / ${option[1]}`}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              <p>질문 {i + 1}</p>
              <input
                type="text"
                name={`question-${i}`}
                value={question.question}
                className="yellow"
                onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
                required
              />
            </label>

            {question.answers.map((answer, j) => (
              <div key={`answers + ${j}`} className={styles.labelBox}>
                <div className={styles.answersTopBox}>
                  <p>
                    선택지 <span>{`${i + 1} - ${j + 1}`}</span>
                  </p>
                  <div className={styles.answerBox}>
                    {questions[i]!.answers!.length > 1 && (
                      <button type="button" className="blue" onClick={() => removeAnswer(i, j)}>
                        –
                      </button>
                    )}
                    <button type="button" className="deepPink" onClick={() => addAnswer(i)}>
                      +
                    </button>
                  </div>
                </div>

                <label className={styles.answersLabel}>
                  <p>점수</p>
                  {SCORE_OPTIONS.map((score, index) => (
                    <div key={score} className={styles.radioWrap}>
                      <input
                        type="radio"
                        name={`score-${i}-${j}`}
                        value={score}
                        checked={answer.score === score}
                        onChange={(e) =>
                          handleAnswerChange(i, j, 'score', parseInt(e.target.value, 10))
                        }
                        required
                      />
                      {data.type === 'MBTI'
                        ? `${MBTI_QUESTIONS_TYPE[question.index]![index]}`
                        : score}
                    </div>
                  ))}
                </label>

                <label>
                  <p>대답</p>
                  <input
                    type="text"
                    name={`answer-${i}-${j}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(i, j, 'text', e.target.value)}
                    required
                  />
                </label>
              </div>
            ))}

            {questions.length > 1 && (
              <button
                type="button"
                className={cx('blue', styles.questionsBtn, styles.minusBtn)}
                onClick={() => removeQuestion(i)}
              >
                – Question
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className={cx('deepPink', styles.questionsBtn, styles.plusBtn)}
          onClick={addQuestion}
        >
          + Question
        </button>
      </div>

      <div className={styles.containerWrap}>
        <h3>Results ( total : {results.length} )</h3>
        {results.map((result, i) => (
          <div key={i} className={styles.labelBox}>
            <label>
              <p>결과 타입</p>
              {data.type === 'MBTI' ? (
                <select
                  name="result"
                  value={result.result}
                  className="yellow"
                  onChange={(e) => handleResultChange(i, 'result', e.target.value)}
                >
                  <option value="">결과를 선택하세요.</option>
                  {MBTI_RESULT_TYPE.map((resultOption) => (
                    <option
                      key={resultOption}
                      value={resultOption}
                      disabled={getSelectedValues().includes(resultOption)}
                    >
                      {resultOption}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="result"
                  value={result.result}
                  className="yellow"
                  onChange={(e) => handleResultChange(i, 'result', e.target.value)}
                  required
                />
              )}
            </label>
            <label>
              <p>결과 제목</p>
              <input
                type="text"
                name="resultTitle"
                value={result.title}
                onChange={(e) => handleResultChange(i, 'title', e.target.value)}
                required
              />
            </label>
            <label>
              <p>결과 내용</p>
              <input
                type="text"
                name="resultContent"
                value={result.content}
                onChange={(e) => handleResultChange(i, 'content', e.target.value)}
                required
              />
            </label>
            <label>
              <p>결과 이미지</p>
              <input
                type="file"
                name="resultImage"
                accept="image/*"
                className={styles.inputFile}
                onChange={(e) => handleFileChange(e, i + 1)}
                required
              />
            </label>
            {results.length > 1 && (
              <button
                type="button"
                className={cx('blue', styles.questionsBtn, styles.minusBtn)}
                onClick={() => removeResult(i)}
              >
                – Results
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className={cx('deepPink', styles.questionsBtn, styles.plusBtn)}
          onClick={addResult}
        >
          + Results
        </button>
      </div>
      <Button type="submit" color="green" text="완료" />
    </form>
  );
}
