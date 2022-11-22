import {
  ContestStatus,
  ContestType,
  MembershipStatus,
  QuestionType,
  RoleTitle,
  StudentLevel,
} from '@/graphql/graphql';

export type Mapper<T> = {
  value: T;
  text: string;
  label?: string;
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
    text: 'المستوى 13 سنة (مَن أنهى الصف السادس الابتدائي )',
    label: 'المستوى 13 سنة',
    value: StudentLevel?.Thirteen,
  },
  {
    text: 'المستوى 14 سنة (مَن أنهى الصف الأول الإعدادي )',
    label: 'المستوى 14 سنة',
    value: StudentLevel?.Fourteen,
  },
  {
    text: 'المستوى 15 سنة (مَن أنهى الصف الثاني الإعدادي )',
    label: 'المستوى 15 سنة',
    value: StudentLevel?.Fifteen,
  },
  {
    text: 'المستوى 16 سنة (مَن أنهى الصف الثالث الإعدادي )',
    label: 'المستوى 16 سنة',
    value: StudentLevel?.Sixteen,
  },
  {
    text: 'المستوى 17 سنة (مَن أنهى الصف الأول الثانوي )',
    label: 'المستوى 17 سنة',
    value: StudentLevel?.Seventeen,
  },
  {
    text: 'المستوى 18 سنة (مَن أنهى الصف الثاني الثانوي )',
    label: 'المستوى 18 سنة',
    value: StudentLevel?.Eighteen,
  },
  {
    text: 'المستوى 19 سنة (مَن يدرس في الصف الثالث الثانوي )',
    label: 'المستوى 19 سنة',
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

// Used for short student level description
export const getLevelsLabel = <T>(mapper: Mapper<T>[], val: T) =>
  mapper.find((m) => m.value === val)?.label;
