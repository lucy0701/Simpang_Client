'use client';

import Button from '@/components/Buttons';
import { postResultAPI } from '@/services/contents';
import { IQuestion } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  questions: IQuestion[];
  contentId: string;
}

export default function ContentPlay({ questions, contentId }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scoreArr, setScoreArr] = useState(Array.from<number>({ length: 12 }).fill(0));
  const [scores, setScores] = useState<Array<number>>([]);
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: postResult } = useMutation({
    mutationFn: postResultAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['result'] });
      router.push(`/results/${data._id}`);
    },
  });

  const handlePostResult = () => {
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

    if (scoreArr.length - 1 === currentIndex) scoreCalculator();
    else setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      <div>
        <p>{questions[currentIndex]?.question}</p>
        {questions[currentIndex]?.answers.map((answer, i) => (
          <Button key={i} text={answer.text} onClick={() => onClickAnswerBtn(answer.score)} />
        ))}
      </div>
    </div>
  );
}
