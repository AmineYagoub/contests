import { Table, Tag } from 'antd';
import moment from 'moment-timezone';

import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import { Contest, ContestStatus, User } from '@/graphql/graphql';
import {
  ContestsDataIndex,
  useSearchContests,
} from '@/hooks/contests/manage.hook';
import { ContestFields } from '@/utils/fields';
import { contestMappedStatus, getMapperLabel } from '@/utils/mapper';

import type { ColumnsType, ColumnType } from 'antd/es/table';
const FinishedContest = ({ user }: { user: User }) => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests();

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
      title: 'تاريخ الإنتهاء',
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
      title: 'حالة المسابقة',
      key: ContestFields.status,
      dataIndex: ContestFields.status,
      filters: contestMappedStatus,
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.status || null,
      render: (status) => {
        let color = status === ContestStatus.Open ? 'green' : 'volcano';
        if (status === ContestStatus.NotStarted) {
          color = 'blue';
        }
        return (
          <Tag color={color}>
            {getMapperLabel<ContestStatus>(contestMappedStatus, status)}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      size="large"
      onChange={methods.handleTableChange}
      pagination={methods.handlePagination}
      style={{ minHeight: 500 }}
    />
  );
};

export default FinishedContest;
