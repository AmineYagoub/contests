import AdminLayout from '@/layout/AdminLayout';
import {
  PermissionTitle,
  RoleTitle,
  Student,
  StudentLevel,
  User,
} from '@/graphql/graphql';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  useSearchUsers,
  useUpdateUsers,
} from '@/hooks/admin/manage-users.hook';
import { StudentFields, StudentsDataIndex, UserFields } from '@/utils/fields';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import moment from 'moment-timezone';
import { Button, Space, Switch, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import { UsersState } from '@/valtio/user.state';
import {
  getLevelsLabel,
  getMapperLabel,
  rolesMappedTypes,
  studentMappedLevels,
} from '@/utils/mapper';
import styled from '@emotion/styled';
import ViewStudentProfile from '@/components/admin/users/students/ViewStudentProfile';
import { useState } from 'react';
import DeleteUser from '@/components/admin/users/DeleteUser';
import { TableBtn } from './dashboard';
import { withAuth } from '@/components/common/withAuth';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const ManageStudents = () => {
  const { methods, filteredInfo } = useSearchUsers('student');
  const studentSnap = useSnapshot(UsersState);
  const [visible, setVisible] = useState(false);
  const [profileKey, setProfileKey] = useState<number>(null);
  const { onUserStateChange, loading: l } = useUpdateUsers();

  const showDrawer = (key: number) => {
    setVisible(true);
    setProfileKey(key);
  };

  const onClose = () => {
    setVisible(false);
  };

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
    filteredValue: filteredInfo[dataIndex] || null,
    onFilter: methods.handleFilter,
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
      filters: studentMappedLevels,
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.level || null,
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
      ...getColumnSearchProps(StudentFields.level),
    },
    {
      title: 'البريد الإلكتروني',
      key: UserFields.emailConfirmed,
      dataIndex: UserFields.emailConfirmed,
      filters: [
        {
          text: 'مفعل',
          value: true,
        },
        {
          text: 'غير مفعل',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.emailConfirmed || null,
      render: (emailConfirmed: boolean) => {
        const color = emailConfirmed ? 'green' : 'red';
        return <Tag color={color}>{emailConfirmed ? 'مفعل' : 'غير مفعل'}</Tag>;
      },
    },
    {
      title: 'نوع العضوية',
      key: UserFields.role,
      filters: [
        {
          text: 'طالب مرتبط بمشرف',
          value: RoleTitle.StudentTeacher,
        },
        {
          text: 'طالب',
          value: RoleTitle.Student,
        },
      ],
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.role || null,
      render: (record: User) =>
        record.role.title === RoleTitle.StudentTeacher ? (
          <Tag color="gold">
            {getMapperLabel(rolesMappedTypes, record.role.title)}
          </Tag>
        ) : (
          <span>{getMapperLabel(rolesMappedTypes, record.role.title)}</span>
        ),
    },
    {
      title: 'حالة العضوية',
      key: UserFields.isActive,
      dataIndex: UserFields.isActive,
      filters: [
        {
          text: 'نشط',
          value: true,
        },
        {
          text: 'غير نشط',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.isActive || null,
      render: (isActive: boolean, record: User) => {
        return (
          <Switch
            checkedChildren="نشط"
            unCheckedChildren="غير نشط"
            defaultChecked={isActive}
            checked={record.isActive}
            onChange={(value) => onUserStateChange(value, record.id)}
            loading={l}
          />
        );
      },
    },

    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record: User) => (
        <Space size="small">
          <DeleteUser record={record} onSuccess={methods.refetchData} />
          <Button
            icon={<EyeOutlined />}
            shape="circle"
            onClick={() => showDrawer(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'الطلاب')}</title>
      </Head>
      <StyledSection>
        <TableBtn onClick={methods.clearAllFilters}>إعادة الضبط</TableBtn>
        <Table
          columns={columns}
          dataSource={studentSnap.users}
          loading={studentSnap.queryLoading}
          size="large"
          onChange={methods.handleTableChange}
          pagination={methods.handlePagination}
          style={{ minHeight: 500 }}
        />
        <ViewStudentProfile
          profileKey={profileKey}
          onClose={onClose}
          visible={visible}
        />
      </StyledSection>
    </>
  );
};

ManageStudents.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default withAuth(ManageStudents, [PermissionTitle.AccessDashboard]);
