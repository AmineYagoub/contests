import {
  OrderByType,
  RoleTitle,
  Student,
  usePaginateUsersQuery,
  User,
} from '@/graphql/graphql';
import { StudentFields, UserFields } from '@/utils/fields';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
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
    title: 'البريد الإلكتروني',
    key: UserFields.emailConfirmed,
    dataIndex: UserFields.emailConfirmed,
    render: (emailConfirmed: boolean) => {
      const color = emailConfirmed ? 'green' : 'red';
      return <Tag color={color}>{emailConfirmed ? 'مفعل' : 'غير مفعل'}</Tag>;
    },
  },
];

const LatestTeachers = () => {
  const { data, loading } = usePaginateUsersQuery({
    variables: {
      params: {
        take: 5,
        skip: 0,
        where: {
          role: [RoleTitle.Teacher, RoleTitle.GoldenTeacher],
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
      title={() => 'آخر المعلمين المسجلين'}
    />
  );
};

export default LatestTeachers;
