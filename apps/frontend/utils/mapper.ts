import { ContestLevel, ContestStatus, ContestType } from '@/graphql/graphql';

export type Mapper<T> = {
  text: string;
  value: T;
};

export const contestMappedStatus: Mapper<ContestStatus>[] = [
  {
    text: 'بدأت',
    value: ContestStatus?.Open,
  },
  {
    text: 'إنتهت',
    value: ContestStatus?.Closed,
  },
  {
    text: 'لم تبدأ بعد',
    value: ContestStatus?.NotStarted,
  },
];

export const contestMappedLevels: Mapper<ContestLevel>[] = [
  {
    text: '13',
    value: ContestLevel?.Thirteen,
  },
  {
    text: '14',
    value: ContestLevel?.Fourteen,
  },
  {
    text: '15',
    value: ContestLevel?.Fifteen,
  },
  {
    text: '16',
    value: ContestLevel?.Sixteen,
  },
  {
    text: '17',
    value: ContestLevel?.Seventeen,
  },
  {
    text: '18',
    value: ContestLevel?.Eighteen,
  },
  {
    text: '19',
    value: ContestLevel?.Nineteen,
  },
];

export const contestMappedTypes: Mapper<ContestType>[] = [
  {
    text: 'مسابقة جهوية',
    value: ContestType?.Regional,
  },
  {
    text: 'مسابقة مركزية',
    value: ContestType?.Centralized,
  },
  {
    text: 'مسابقة دولية',
    value: ContestType?.Worldwide,
  },
];

export const getMapperLabel = <T>(mapper: Mapper<T>[], val: T) =>
  mapper.find((m) => m.value === val)?.text;
