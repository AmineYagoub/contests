import {
  getLevelsLabel,
  getMapperLabel,
  rolesMappedTypes,
  studentMappedLevels,
} from '@/utils/mapper';
import moment from 'moment-timezone';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { ContestFields } from '@/utils/fields';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import DeleteContest from '@/components/admin/contests/DeleteContest';
import UpdateContest from '@/components/admin/contests/UpdateContest';
import { ContestsDataIndex } from '@/hooks/admin/manage-contests.hook';
import { Contest, RoleTitle, StudentLevel, User } from '@/graphql/graphql';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';

const ManageContestsTable = ({
  methods,
  data,
  loading,
  filteredInfo,
  sortedInfo,
}) => {
  const [participants, setParticipants] = useState('جاري فرز المتسابقين ... ');

  useEffect(() => {
    const t = setTimeout(() => {
      setParticipants(null);
    }, 10 * 1000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const getColumnSearchProps = (
    dataIndex: ContestsDataIndex
  ): ColumnType<Contest> => ({
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
    dataIndex: ContestsDataIndex
  ): ColumnType<Contest> => ({
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
    filteredValue: filteredInfo[dataIndex] || null,
    onFilter: methods.handleFilter,
    render: (date: string | number | Date) => (
      <span>{moment(date).calendar()}</span>
    ),
  });

  const refetchData = () => {
    methods.refetch();
  };

  const columns: ColumnsType<ColumnType<Contest>> = [
    {
      title: 'عنوان المسابقة',
      dataIndex: ContestFields.title,
      key: ContestFields.title,
      ...getColumnSearchProps(ContestFields.title),
      render(value) {
        return <a>{value}</a>;
      },
    },
    {
      title: 'منشئ المسابقة',
      dataIndex: ContestFields.authorId,
      key: ContestFields.authorId,
      render(record: User) {
        const { firstName, lastName } = record.profile;
        return (
          <>
            <b>
              {firstName} {lastName}
            </b>
            <br />
            <Tag
              color={record.role.title === RoleTitle.Admin ? 'green' : 'gold'}
            >
              {getMapperLabel(rolesMappedTypes, record.role.title)}
            </Tag>
          </>
        );
      },
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: ContestFields.created,
      key: ContestFields.created,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === ContestFields.created
          ? sortedInfo.order
          : null,
      ...getColumnSearchDateProps(ContestFields.created),
    },
    {
      title: 'تاريخ البدء',
      dataIndex: ContestFields.startTime,
      key: ContestFields.startTime,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === ContestFields.startTime
          ? sortedInfo.order
          : null,
      ...getColumnSearchDateProps(ContestFields.startTime),
    },
    {
      title: 'مدة المسابقة',
      dataIndex: ContestFields.duration,
      key: ContestFields.duration,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === ContestFields.duration
          ? sortedInfo.order
          : null,
      render: (text) => `${text} دقيقة`,
    },
    {
      title: 'عدد المشاركين',
      dataIndex: ContestFields.participants,
      key: ContestFields.participants,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === ContestFields.participants
          ? sortedInfo.order
          : null,
      render: (data: string[]) =>
        participants ? participants : `${data.length} طالب`,
    },
    {
      title: 'المستوى المستهدف',
      dataIndex: ContestFields.level,
      key: ContestFields.level,
      filters: studentMappedLevels,
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.level || null,
      render: (levels: StudentLevel[]) => {
        return levels ? (
          levels?.map((level) => (
            <Tag color="red" key={level}>
              {getLevelsLabel<StudentLevel>(studentMappedLevels, level)}
            </Tag>
          ))
        ) : (
          <Tag color="gold">غير محدد</Tag>
        );
      },
    },

    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record) => (
        <Space size="small">
          <DeleteContest record={record} onSuccess={refetchData} />
          <UpdateContest record={record} onSuccess={refetchData} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      size="large"
      columns={columns}
      dataSource={data}
      loading={loading}
      onChange={methods.handleTableChange}
      pagination={methods.handlePagination}
      style={{ minHeight: 500 }}
    />
  );
};

export default ManageContestsTable;
