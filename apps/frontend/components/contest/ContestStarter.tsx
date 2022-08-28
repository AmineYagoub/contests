import { AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { Question } from '@/graphql/graphql';
import { ContestState } from '@/valtio/contest.state';

import ContestAnnulled from './ContestAnnulled';
import ContestFinished from './ContestFinished';
import ContestQuestionnaire from './ContestQuestionnaire';
import ContestWelcome from './ContestWelcome';

const ContestStarter = () => {
  const contestSnap = useSnapshot(ContestState);
  if (!contestSnap.contest) {
    return;
  }

  return (
    <AnimatePresence mode="wait">
      {contestSnap.contestStarted ? (
        <ContestQuestionnaire
          question={
            contestSnap.contest.questions[
              contestSnap.contestCurrentIndex
            ] as Question
          }
        />
      ) : contestSnap.contestFinished ? (
        <ContestFinished />
      ) : contestSnap.contestAnnulled ? (
        <ContestAnnulled />
      ) : (
        <ContestWelcome />
      )}
    </AnimatePresence>
  );
};

export default ContestStarter;
