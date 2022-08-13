import { ContestsDataIndex } from '@/hooks/admin/manage-contests';
import { QuestionsDataIndex } from '@/hooks/admin/manage-questions';

export const ContestFields: { [P in ContestsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  duration: 'duration',
  level: 'level',
  type: 'type',
  countries: 'countries',
  status: 'status',
  startTime: 'startTime',
  created: 'created',
  authorId: 'authorId',
  maxParticipants: 'maxParticipants',
  published: 'published',
  participants: 'participants',
  questionCount: 'questionCount',
  updated: 'updated',
  __typename: '__typename',
};

export const QuestionFields: { [P in QuestionsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  options: 'options',
  level: 'level',
  type: 'type',
  authorId: 'authorId',
  published: 'published',
  usedCount: 'usedCount',
  created: 'created',
  updated: 'updated',
  __typename: '__typename',
};
