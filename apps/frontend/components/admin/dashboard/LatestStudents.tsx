import {
  OrderByType,
  RoleTitle,
  Student,
  StudentLevel,
  usePaginateUsersQuery,
  User,
} from '@/graphql/graphql';
import { StudentFields, UserFields } from '@/utils/fields';
import { getLevelsLabel, studentMappedLevels } from '@/utils/mapper';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment-timezone';

const columns: ColumnsType<User & Student> = [
  {
    title: 'الإسم الأول',
    key: StudentFields.firstName,
    render: (record: User) => <span>{record.profile.firstName}</span>,
  },
  {
    title: 'الإسم الثاني',
    key: StudentFields.lastName,
    render: (record: User) => <span>{record.profile.lastName}</span>,
  },
  {
    title: 'تاريخ التسجيل',
    dataIndex: StudentFields.created,
    key: StudentFields.created,
    render: (date: string | number | Date) => (
      <span>{moment(date).calendar()}</span>
    ),
  },
  {
    title: 'البلد',
    key: StudentFields.country,
    render: (record: User) => <span>{record.profile.country}</span>,
  },
  {
    title: 'المستوى',
    key: StudentFields.level,
    render: (record: User) => {
      return (
        <Tag color="blue">
          {getLevelsLabel<StudentLevel>(
            studentMappedLevels,
            (record.profile as Student).level
          )}
        </Tag>
      );
    },
  },
  {
    title: 'البريد الإلكتروني',
    key: UserFields.emailConfirmed,
    dataIndex: UserFields.emailConfirmed,
    render: (emailConfirmed: boolean) => {
      const color = emailConfirmed ? 'green' : 'red';
      return <Tag color={color}>{emailConfirmed ? 'مفعل' : 'غير مفعل'}</Tag>;
    },
  },
];

const LatestStudents = () => {
  const { data, loading } = usePaginateUsersQuery({
    variables: {
      params: {
        take: 5,
        skip: 0,
        where: {
          role: [RoleTitle.Student, RoleTitle.StudentTeacher],
        },
        orderBy: { created: OrderByType.Desc },
      },
    },
    ssr: false,
  });
  return (
    <Table
      columns={columns}
      dataSource={data?.paginateUsers.data as User[]}
      pagination={{ hideOnSinglePage: true }}
      loading={loading}
      title={() => 'آخر الطلبة المسجلين'}
    />
  );
};

export default LatestStudents;
