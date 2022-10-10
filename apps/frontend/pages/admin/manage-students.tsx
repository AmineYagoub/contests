import { Student, User } from '@/graphql/graphql';
import { useSearchStudents } from '@/hooks/admin/manage-students.hook';
import AdminLayout from '@/layout/AdminLayout';
import { StudentFields, StudentsDataIndex, UserFields } from '@/utils/fields';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import moment from 'moment-timezone';
import { Button, Space, Switch, Table, Tag } from 'antd';
import { DeleteColumnOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import { StudentState } from '@/valtio/student.state';

const ManageStudents = () => {
  const { methods } = useSearchStudents();
  const studentSnap = useSnapshot(StudentState);

  const getColumnSearchProps = (
    dataIndex: StudentsDataIndex
  ): ColumnType<Student> => ({
    filterDropdown: (props) => (
      <SearchInput
        {...props}
        dataIndex={dataIndex}
        handleSearch={methods.handleSearch}
        handleReset={methods.handleReset}
      />
    ),
    filterIcon: (filtered: boolean) => <SearchIcon filtered={filtered} />,
    //filteredValue: filteredInfo[dataIndex] || null,
    // onFilter: methods.handleFilter,
  });

  const getColumnSearchDateProps = (
    dataIndex: StudentsDataIndex
  ): ColumnType<Student> => ({
    filterDropdown: (props) => (
      <SearchDatePicker
        {...props}
        dataIndex={dataIndex}
        handleSearch={methods.handleSearch}
        handleReset={methods.handleReset}
      />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchDatePickerIcon filtered={filtered} />
    ),
    //filteredValue: filteredInfo[dataIndex] || null,
    //onFilter: methods.handleFilter,
    render: (date: string | number | Date) => (
      <span>{moment(date).calendar()}</span>
    ),
  });

  const columns: ColumnsType<User & Student> = [
    {
      title: 'الإسم الأول',
      key: StudentFields.firstName,
      render: (record: User) => <span>{record.profile.firstName}</span>,
      ...getColumnSearchProps(StudentFields.firstName),
    },
    {
      title: 'الإسم الثاني',
      key: StudentFields.lastName,
      render: (record: User) => <span>{record.profile.lastName}</span>,
      ...getColumnSearchProps(StudentFields.lastName),
    },
    {
      title: 'تاريخ التسجيل',
      dataIndex: StudentFields.created,
      key: StudentFields.created,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchDateProps(StudentFields.created),
    },
    {
      title: 'البلد',
      key: StudentFields.country,
      render: (record: User) => <span>{record.profile.country}</span>,
      ...getColumnSearchProps(StudentFields.country),
    },
    {
      title: 'المستوى',
      key: StudentFields.level,
      render: (record: User) => (
        <span>{(record.profile as Student).level}</span>
      ),
      ...getColumnSearchProps(StudentFields.level),
    },
    {
      title: 'البريد الإلكتروني',
      key: UserFields.emailConfirmed,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (emailConfirmed: boolean) => {
        const color = emailConfirmed ? 'green' : 'red';
        return <Tag color={color}>{emailConfirmed ? 'مفعل' : 'غير مفعل'}</Tag>;
      },
    },
    {
      title: 'نوع العضوية',
      key: UserFields.role,
      render: (record: User) => <span>{record.role.title}</span>,
    },
    {
      title: 'حالة العضوية',
      key: UserFields.isActive,
      dataIndex: UserFields.isActive,
      render: (isActive: boolean, record) => {
        return (
          <Switch
            checkedChildren="نشط"
            unCheckedChildren="محظور"
            defaultChecked={isActive}
            // onChange={(value) => onStatChange(value, record)}
          />
        );
      },
    },

    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record) => (
        <Space size="small">
          <Button icon={<DeleteColumnOutlined />} shape="circle" />
          <Button icon={<DeleteColumnOutlined />} shape="circle" />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={studentSnap.students}
      loading={studentSnap.queryLoading}
      size="large"
      onChange={methods.handleTableChange}
      pagination={methods.handlePagination}
      style={{ minHeight: 500 }}
    />
  );
};

ManageStudents.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default ManageStudents;
