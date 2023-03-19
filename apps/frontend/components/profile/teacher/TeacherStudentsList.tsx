import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { useState } from 'react';
import moment from 'moment-timezone';
import { useSnapshot } from 'valtio';
import styled from '@emotion/styled';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import { UsersState } from '@/valtio/user.state';
import { TableBtn } from '@/pages/admin/dashboard';
import DisconnectStudent from './DisconnectStudent';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { Student, StudentLevel, User } from '@/graphql/graphql';
import { useSearchUsers } from '@/hooks/admin/manage-users.hook';
import { StudentFields, StudentsDataIndex } from '@/utils/fields';
import { getLevelsLabel, studentMappedLevels } from '@/utils/mapper';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import ViewStudentProfile from '@/components/admin/users/students/ViewStudentProfile';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
  width: '100%',
});

const TeacherStudentsList = ({ teacherId }: { teacherId: string }) => {
  const { methods, filteredInfo } = useSearchUsers('student', teacherId);
  const teacherSnap = useSnapshot(UsersState);
  const [visible, setVisible] = useState(false);
  const [profileKey, setProfileKey] = useState<number>(null);

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
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record: User) => (
        <Space size="small">
          <DisconnectStudent
            studentId={record.id}
            onSuccess={methods.refetchData}
          />

          <Button
            icon={<EyeOutlined style={{ color: 'teal' }} />}
            shape="circle"
            onClick={() => showDrawer(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <StyledSection>
      <TableBtn onClick={methods.clearAllFilters}>إعادة الضبط</TableBtn>
      <h2>الطلاب المشرف عليهم</h2>
      <Table
        columns={columns}
        dataSource={teacherSnap.users}
        loading={teacherSnap.queryLoading}
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
  );
};

export default TeacherStudentsList;
