'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants';
import { postResultAPI } from '@/services/contents';
import { IQuestion } from '@/types';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';
import { CatLoading } from '@/components/Loading';

interface Props {
  questions: IQuestion[];
  contentId: string;
}

interface ScoreArr {
  index: number;
  score: number;
}

export default function ContentPlay({ questions, contentId }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scores, setScores] = useState<Array<number>>([0, 0, 0, 0]);
  const [playScores, setPlayScores] = useState<ScoreArr[]>(
    questions.map((question) => ({ index: question.index, score: 0 })),
  );
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: postResult } = useMutation({
    mutationFn: postResultAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['result'] });
      router.push(`${PATHS.RESULTS}/${data._id}`);
    },
  });

  const handlePostResult = () => {
    setIsLoading(true);
    postResult({ contentId, scores });
  };

  useEffect(() => {
    if (playScores.length - 1 === currentIndex) handlePostResult();
  }, [scores]);

  const calculateScoreSum = () => {
    const newScores = [0, 0, 0, 0];

    playScores.forEach(({ index, score }) => {
      if (newScores[index] === undefined) {
        newScores[index] = 0;
      }
      newScores[index] += score;
    });

    setScores(newScores);
  };

  const onClickAnswerBtn = (currentScore: number) => {
    setPlayScores((prev) => {
      const newScore = [...prev];
      newScore[currentIndex]!.score = currentScore;
      return newScore;
    });

    if (playScores.length - 1 === currentIndex) {
      calculateScoreSum();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const calculateWidth = () => {
    const percentage = ((currentIndex + 1) / playScores.length) * 100;
    return `${percentage}%`;
  };

  return isLoading ? (
    <CatLoading />
  ) : (
    <div className={styles.wrap}>
      <div className={styles.question}>
        <div className={styles.progressBarWrap}>
          <div className={styles.progressBarBox}>
            <div className={styles.progressBar} style={{ width: calculateWidth() }} />
          </div>
          <p>
            {currentIndex + 1} / {playScores.length}
          </p>
        </div>
        <p className={styles.question}>{questions[currentIndex]?.question}</p>
      </div>

      <div className={styles.buttonBox}>
        {questions[currentIndex]?.answers.map((answer, i) => (
          <Button
            key={i}
            disabled={isLoading}
            text={answer.text}
            onClick={() => onClickAnswerBtn(answer.score)}
          />
        ))}
      </div>

      <div className={styles.indexMoveBtnBox}>
        {currentIndex > 0 && (
          <Button
            text="이전"
            size="small"
            color="yellow"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          />
        )}
        {playScores[currentIndex]?.score !== 0 && (
          <Button
            text="다음"
            size="small"
            color="yellow"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          />
        )}
      </div>
    </div>
  );
}
