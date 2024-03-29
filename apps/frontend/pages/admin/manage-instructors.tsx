import AdminLayout from '@/layout/AdminLayout';
import { PermissionTitle, RoleTitle, Student, User } from '@/graphql/graphql';
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
import styled from '@emotion/styled';
import ViewTeacherProfile from '@/components/admin/users/teachers/ViewTeacherProfile';
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
const StyledSwitch = styled(Switch)({
  backgroundColor: 'yellowgreen !important',
  ['&.ant-switch-checked']: {
    backgroundColor: 'gold !important',
    span: {
      color: '#666',
    },
  },
});

const ManageInstructors = () => {
  const { methods, filteredInfo } = useSearchUsers('teacher');
  const userSnap = useSnapshot(UsersState);
  const [visible, setVisible] = useState(false);
  const [profileKey, setProfileKey] = useState<number>(null);
  const {
    onTeacherRoleChange,
    onUserStateChange,
    loading: l,
  } = useUpdateUsers();

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
          text: 'معلم ذهبي',
          value: RoleTitle.GoldenTeacher,
        },
        {
          text: 'معلم',
          value: RoleTitle.Teacher,
        },
      ],
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.role || null,
      render: (record: User) => {
        return (
          <StyledSwitch
            unCheckedChildren="معلم"
            checkedChildren="معلم ذهبي"
            defaultChecked={record.role.title === RoleTitle.GoldenTeacher}
            checked={record.role.title === RoleTitle.GoldenTeacher}
            onChange={(value) => onTeacherRoleChange(value, record.id)}
            loading={l}
          />
        );
      },
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
        <title>{getTitleMeta('لوحة التحكم', 'المعلمين')}</title>
      </Head>
      <StyledSection>
        <TableBtn onClick={methods.clearAllFilters}>إعادة الضبط</TableBtn>
        <Table
          columns={columns}
          dataSource={userSnap.users}
          loading={userSnap.queryLoading}
          size="large"
          onChange={methods.handleTableChange}
          pagination={methods.handlePagination}
          style={{ minHeight: 500 }}
        />
      </StyledSection>
      <ViewTeacherProfile
        profileKey={profileKey}
        onClose={onClose}
        visible={visible}
      />
    </>
  );
};

ManageInstructors.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageInstructors, [PermissionTitle.AccessDashboard]);
