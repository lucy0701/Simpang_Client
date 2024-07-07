'use client';

import Button from '@/components/Buttons';
import CatLoading from '@/components/Loading/CatLoading';
import { PATHS } from '@/constants';
import { postResultAPI } from '@/services/contents';
import { IQuestion } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  questions: IQuestion[];
  contentId: string;
}

export default function ContentPlay({ questions, contentId }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scoreArr, setScoreArr] = useState(Array.from<number>({ length: 12 }).fill(0));
  const [scores, setScores] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (scoreArr.length - 1 === currentIndex) handlePostResult();
  }, [scores]);

  const scoreCalculator = (index = 0) => {
    const newScores: Array<number> = [];
    for (let i = 0; i < scoreArr.length; i += 3) {
      const sumScore = scoreArr
        .slice(index * 3, (index + 1) * 3)
        .reduce((acc, cur) => acc + cur, 0);
      newScores.push(sumScore);
    }

    setScores(newScores);
  };

  const onClickAnswerBtn = (currentScore: number) => {
    setScoreArr((prev) => {
      const newScore = [...prev];
      newScore[currentIndex] = currentScore;
      return newScore;
    });

    if (scoreArr.length - 1 === currentIndex) {
      scoreCalculator();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const calculateWidth = () => {
    const percentage = ((currentIndex + 1) / scoreArr.length) * 100;
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
            {currentIndex + 1} / {scoreArr.length}
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
        {scoreArr[currentIndex] !== 0 && (
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
