import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import {
  Question,
  SelectedAnswerInput,
  useCreateAnswerMutation,
} from '@/graphql/graphql';
import { CongratsAnimation } from '@/utils/CongratsAnimation';
import { ContestState } from '@/valtio/contest.state';

import ContestAnnulled from './ContestAnnulled';
import ContestFinished from './ContestFinished';
import ContestQuestionnaire from './ContestQuestionnaire';
import ContestWelcome from './ContestWelcome';

const ContestStarter = ({ contestId }: { contestId: string }) => {
  const contestSnap = useSnapshot(ContestState);
  const [CreateAnswerMutation] = useCreateAnswerMutation();
  const [loading, setLoading] = useState(false);
  const [answerId, setAnswerId] = useState(null);

  useEffect(() => {
    const animation = new CongratsAnimation(document.querySelector('body'));
    if (contestSnap.contestFinished) {
      setLoading(true);
      animation.render();
      // TODO Handle if answers not saved
      CreateAnswerMutation({
        variables: {
          data: {
            userId: '123',
            answers: contestSnap.answers as SelectedAnswerInput[],
            contest: {
              connect: {
                id: contestId,
              },
            },
          },
        },
      })
        .then(({ data }) => {
          setAnswerId(data.createAnswer.id);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => {
      animation.destroy();
    };
  }, [contestSnap.contestFinished]);

  if (!contestSnap.contest) {
    return;
  }

  const prevAnswer = contestSnap.answers.find(
    (el) => el.questionIndex === contestSnap.contestCurrentIndex
  ) as SelectedAnswerInput;
  const question = contestSnap.contest.questions[
    contestSnap.contestCurrentIndex
  ] as Question;

  return (
    <AnimatePresence mode="wait">
      {contestSnap.contestStarted && question ? (
        <ContestQuestionnaire question={question} prevAnswer={prevAnswer} />
      ) : contestSnap.contestFinished ? (
        <ContestFinished
          loading={loading}
          answerId={answerId}
          contestId={contestId}
        />
      ) : contestSnap.contestAnnulled ? (
        <ContestAnnulled />
      ) : (
        <ContestWelcome />
      )}
    </AnimatePresence>
  );
};

export default ContestStarter;
