import { QuestionsDataIndex } from '@/hooks/admin/manage-questions.hook';
import { ContestsDataIndex } from '@/hooks/contests/manage.hook';

export const ContestFields: { [P in ContestsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  duration: 'duration',
  level: 'level',
  type: 'type',
  answers: 'answers',
  questions: 'questions',
  countries: 'countries',
  status: 'status',
  startTime: 'startTime',
  created: 'created',
  authorId: 'authorId',
  tags: 'tags',
  maxParticipants: 'maxParticipants',
  published: 'published',
  participants: 'participants',
  easyQuestionCount: 'easyQuestionCount',
  mediumQuestionCount: 'mediumQuestionCount',
  hardQuestionCount: 'hardQuestionCount',
  updated: 'updated',
  user: 'user',
  __typename: '__typename',
};

export const QuestionFields: { [P in QuestionsDataIndex]: P } = {
  id: 'id',
  title: 'title',
  options: 'options',
  type: 'type',
  authorId: 'authorId',
  published: 'published',
  usedCount: 'usedCount',
  created: 'created',
  updated: 'updated',
  correctAnswer: 'correctAnswer',
  lesson: 'lesson',
  tags: 'tags',
  __typename: '__typename',
};
