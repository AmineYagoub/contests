import {
  ContestStatus,
  ContestType,
  MembershipStatus,
  QuestionType,
  RoleTitle,
  StudentLevel,
} from '@/graphql/graphql';

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

export const studentMappedLevels: Mapper<StudentLevel>[] = [
  {
    text: '13',
    value: StudentLevel?.Thirteen,
  },
  {
    text: '14',
    value: StudentLevel?.Fourteen,
  },
  {
    text: '15',
    value: StudentLevel?.Fifteen,
  },
  {
    text: '16',
    value: StudentLevel?.Sixteen,
  },
  {
    text: '17',
    value: StudentLevel?.Seventeen,
  },
  {
    text: '18',
    value: StudentLevel?.Eighteen,
  },
  {
    text: '19',
    value: StudentLevel?.Nineteen,
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

export const questionMappedTypes: Mapper<QuestionType>[] = [
  {
    text: 'سهل',
    value: QuestionType?.Easy,
  },
  {
    text: 'متوسط',
    value: QuestionType?.Medium,
  },
  {
    text: 'صعب',
    value: QuestionType?.Hard,
  },
];

export const membershipStatusMappedTypes: Mapper<MembershipStatus>[] = [
  {
    text: 'في إنتظار الدفع',
    value: MembershipStatus?.Unpaid,
  },
  {
    text: 'مفعل',
    value: MembershipStatus?.Active,
  },
  {
    text: 'ملغي',
    value: MembershipStatus.Canceled,
  },
  {
    text: 'إنتهى',
    value: MembershipStatus?.Expired,
  },
];

export const rolesMappedTypes: Mapper<RoleTitle>[] = [
  {
    text: 'المدير',
    value: RoleTitle.Admin,
  },
  {
    text: 'المشرف',
    value: RoleTitle.Moderator,
  },
  {
    text: 'معلم ذهبي',
    value: RoleTitle.GoldenTeacher,
  },
  {
    text: 'معلم',
    value: RoleTitle.Teacher,
  },
  {
    text: 'طالب',
    value: RoleTitle.Student,
  },
  {
    text: 'طالب مرتبط بمشرف',
    value: RoleTitle.StudentTeacher,
  },
];

export const getMapperLabel = <T>(mapper: Mapper<T>[], val: T) =>
  mapper.find((m) => m.value === val)?.text;

export const getLevelsValues = (text: string) =>
  studentMappedLevels.find((m) => m.text === text)?.value;
