'use client';

import cx from 'classnames';
import { ChangeEvent, useState } from 'react';

import { CONTENT_TYPE } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { uploadToImageBB } from '@/services/upload';
import { ContentType, IQuestion } from '@/types';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';

interface ContentData {
  title: string;
  content: string;
  imageUrl: string;
  type: ContentType;
}

interface ResultData {
  result: string;
  title: string;
  content: string;
  imageUrl: string;
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

const initialResults = MBTI_RESULT_TYPE.map((type) => ({
  result: type,
  title: '',
  content: '',
  imageUrl: '',
}));

const MBTI_QUESTIONS_TYPE = [
  ['I', 'E'],
  ['S', 'N'],
  ['F', 'T'],
  ['P', 'J'],
];

export default function Register() {
  const [content, setContent] = useState<ContentData>({
    type: 'MBTI',
    title: '',
    content: '',
    imageUrl: '',
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
        {
          score: 0,
          text: '',
        },
      ],
    },
  ]);

  const [results, setResults] = useState<ResultData[]>(initialResults);

  const handleInputChange = (value: string | number, field: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0] ?? null;
    const imageUrl = await uploadToImageBB(file!);

    if (index === -1) setContent((prev) => ({ ...prev, imageUrl }));
    setResults(results.map((r, i) => (i === index ? { ...r, imageUrl } : r)));
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
    const updatedQuestions = questions.map((question, i) => {
      if (i === qIndex) {
        const updatedAnswers = question.answers.map((answer, j) =>
          j === aIndex ? { ...answer, [field]: value } : answer,
        );
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    setResults(results.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const addQuestion = () => {
    const newQuestion: IQuestion = {
      index: 0,
      question: '',
      answers: [
        { score: 0, text: '' },
        { score: 0, text: '' },
      ],
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (content.type === 'MBTI' && questions.length < 4 && results.length !== 16)
      return alert('MBTI의 질문은 최소 4개 이상, 결과는 16개로 작성해주세요!');

    if (!checkOddCountIndices()) {
      return alert('각 질문의 점수의 합이 0이 되지 않도록 홀 수로 작성해 주세요!');
    }

    const contentData = {
      ...content,
      questions,
      results,
    };

    try {
      const response = await apiBe.post('/v1/contents', contentData, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return (
    <form className={styles.formWrap} onSubmit={handleSubmit}>
      <label>
        <p>카테고리</p>
        <select
          name="type"
          defaultValue={content.type}
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
          value={content.title}
          onChange={(e) => handleInputChange(e.target.value, 'title')}
          required
          maxLength={100}
        />
      </label>

      <label>
        <p>설명</p>
        <textarea
          name="content"
          value={content.content}
          onChange={(e) => handleInputChange(e.target.value, 'content')}
          required
          rows={4}
          maxLength={500}
        />
      </label>

      <label>
        <p>대표 이미지</p>
        <input
          type="file"
          name="image"
          className={styles.inputFile}
          accept="image/*"
          onChange={(e) => handleFileChange(e, -1)}
          required
        />
      </label>

      <div className={styles.containerWrap}>
        <h3>Questions ( total : {questions.length} )</h3>

        {questions.map((question, i) => (
          <div key={`question + ${i}`} className={cx(styles.labelBox, styles.questionLabelBox)}>
            {content.type === 'MBTI' && (
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
              <textarea
                name={`question-${i}`}
                rows={4}
                value={question.question}
                onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
                required
                maxLength={200}
              />
            </label>

            {question.answers.map((answer, j) => (
              <div key={`answers + ${j}`} className={styles.labelBox}>
                <div className={styles.answersTopBox}>
                  <p>선택지 {`${i + 1} - ${j + 1}`}</p>
                  <div className={styles.answerBox}>
                    {questions[i]!.answers!.length > 2 && (
                      <button
                        type="button"
                        className={cx('blue', styles.minusAnswerBtn)}
                        onClick={() => removeAnswer(i, j)}
                      >
                        ⎯
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.answersWrap}>
                  <p>점수</p>
                  <div className={styles.radioWrap}>
                    {SCORE_OPTIONS.map((score, index) => (
                      <label key={score} className={styles.radioLabel}>
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

                        {content.type === 'MBTI' ? (
                          <span>{MBTI_QUESTIONS_TYPE[question.index]![index]}</span>
                        ) : (
                          <span>score</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <label>
                  <p>대답</p>
                  <textarea
                    name={`answer-${i}-${j}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(i, j, 'text', e.target.value)}
                    required
                    maxLength={100}
                  />
                </label>
              </div>
            ))}
            <div className={styles.btnBox}>
              {questions.length > 1 && (
                <button
                  type="button"
                  className={cx('blue', styles.miniBtn)}
                  onClick={() => removeQuestion(i)}
                >
                  – Question
                </button>
              )}
              <button
                type="button"
                className={cx('deepPink', styles.miniBtn)}
                onClick={() => addAnswer(i)}
              >
                + Answer
              </button>
            </div>
          </div>
        ))}

        <button type="button" className={cx('deepPink', styles.addBtn)} onClick={addQuestion}>
          + Question
        </button>
      </div>

      <div className={styles.containerWrap}>
        <h3>Results ( total : {results.length} )</h3>
        {results.map((result, i) => (
          <div key={i} className={styles.labelBox}>
            <h3 className={styles.resultH3}>{result.result}</h3>
            <label>
              <p>{result.result} 제목</p>
              <input
                type="text"
                name="resultTitle"
                value={result.title}
                onChange={(e) => handleResultChange(i, 'title', e.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label>
              <p>{result.result} 내용</p>
              <textarea
                name="resultContent"
                value={result.content}
                onChange={(e) => handleResultChange(i, 'content', e.target.value)}
                required
                rows={4}
                cols={50}
                maxLength={500}
              />
            </label>
            <label>
              <p>{result.result} 이미지</p>
              <input
                type="file"
                name="resultImage"
                accept="image/*"
                className={styles.inputFile}
                onChange={(e) => handleFileChange(e, i)}
                required
              />
            </label>
          </div>
        ))}
      </div>
      <Button type="submit" color="green" text="완료" />
    </form>
  );
}
