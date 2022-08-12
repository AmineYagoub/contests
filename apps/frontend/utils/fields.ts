import { ContestsDataIndex } from '@/hooks/admin/manage-contests';

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
