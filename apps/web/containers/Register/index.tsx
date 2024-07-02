'use client';

import { apiBe, getHeaders } from '@/services';
import { ContentType, Question } from '@/types/content';
import { Result } from '@/types/result';
import { ChangeEvent, useState } from 'react';
import cx from 'classnames';

import styles from './index.module.scss';
import Button from '@/components/Buttons';
import { CONTENT_TYPE } from '@/constants';

interface ContentData {
  title: string;
  content: string;
  imageUrls: { index: number; imageUrl: File | null }[];
  type: ContentType;
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

export default function Register() {
  const [data, setData] = useState<ContentData>({
    type: 'MBTI',
    title: '',
    content: '',
    imageUrls: [],
  });

  const [questions, setQuestions] = useState<Question[]>([
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

  const [results, setResults] = useState<Result[]>([
    {
      result: '',
      title: '',
      content: '',
    },
  ]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
  ) => {
    const { value } = e.target;
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

  const addQuestion = () => {
    const newIndex = questions.length;
    const newQuestion: Question = {
      index: newIndex,
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

    if (!data) return alert('데이터가 비어있습니다! 채워주세요');

    formData.append('type', data.type);
    formData.append('title', data.title);
    formData.append('content', data.content);

    data!.imageUrls.forEach((image: { index: number; imageUrl: File | null }) => {
      if (image.imageUrl instanceof File) {
        formData.append(`imageUrls`, image.imageUrl);
        console.log('PSJ: image.imageUrl', image.imageUrl);
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
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form
      className={cx(styles.formWrap, styles.wrap_gap_10)}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <label className={styles.selectBox}>
        type:
        <select name="type" defaultValue={data.type} onChange={(e) => handleInputChange(e, 'type')}>
          {CONTENT_TYPE.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          ;
        </select>
      </label>
      <label>
        title:
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => handleInputChange(e, 'title')}
        />
      </label>
      <label>
        content:
        <input
          type="text"
          name="content"
          value={data.content}
          onChange={(e) => handleInputChange(e, 'content')}
        />
      </label>
      <label>
        image:
        <input type="file" name="image" accept="image/*" onChange={(e) => handleFileChange(e, 0)} />
      </label>
      <h3>Questions</h3>
      {questions.map((question, i) => (
        <div key={`question + ${i}`} className={styles.questionBox}>
          <label>
            질문 {i + 1}:
            <input
              type="text"
              name={`question-${i}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
            />
          </label>
          {question.answers.map((answer, j) => (
            <div key={`answers + ${j}`} className={styles.wrap_gap_10}>
              대답 {`[${i + 1}-${j + 1}]`}:
              <label>
                점수:
                {SCORE_OPTIONS.map((score) => (
                  <label key={score}>
                    <input
                      type="radio"
                      name={`score-${i}-${j}`}
                      value={score}
                      checked={answer.score === score}
                      onChange={(e) =>
                        handleAnswerChange(i, j, 'score', parseInt(e.target.value, 10))
                      }
                    />
                    {score}
                  </label>
                ))}
              </label>
              <label>
                내용:
                <input
                  type="text"
                  name={`answer-${i}-${j}`}
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(i, j, 'text', e.target.value)}
                />
              </label>
              {questions[i]!.answers!.length > 1 && (
                <Button size="small" text=" - answer" onClick={() => removeAnswer(i, j)} />
              )}
            </div>
          ))}
          <Button size="medium" text=" + answer" onClick={() => addAnswer(i)} />
          {questions.length > 1 && <Button text=" - question" onClick={() => removeQuestion(i)} />}
        </div>
      ))}
      <Button text=" + question" onClick={addQuestion} />
      <h3>Results</h3>
      {results.map((result, i) => (
        <div key={i} className={styles.wrap_gap_10}>
          <label className={styles.selectBox}>
            {result.result || '결과'} :
            <select
              name="result"
              value={result.result}
              onChange={(e) => handleResultChange(i, 'result', e.target.value)}
            >
              {data.type === 'MBTI' &&
                MBTI_RESULT_TYPE.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
            </select>
          </label>
          <label>
            {result.result || '결과'} 제목 :
            <input
              type="text"
              name="resultTitle"
              value={result.title}
              onChange={(e) => handleResultChange(i, 'title', e.target.value)}
            />
          </label>
          <label>
            {result.result || '결과'} 내용 :
            <input
              type="text"
              name="resultContent"
              value={result.content}
              onChange={(e) => handleResultChange(i, 'content', e.target.value)}
            />
          </label>
          <label>
            {result.result || '결과'} 이미지 :
            <input
              type="file"
              name="resultImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, i + 1)}
            />
          </label>
          {results.length > 1 && <Button text=" - results" onClick={() => removeResult(i)} />}
        </div>
      ))}
      <Button text=" + results" onClick={addResult} />

      <Button type="submit" text="Submit">
        Submit
      </Button>
    </form>
  );
}
