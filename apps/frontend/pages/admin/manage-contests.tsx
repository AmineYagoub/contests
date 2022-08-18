import { Space, Table, Tag } from 'antd';
import moment from 'moment-timezone';
import { useState } from 'react';

import CreateContest from '@/components/admin/contests/CreateContest';
import DeleteContest from '@/components/admin/contests/DeleteContest';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import { Contest, ContestStatus, StudentLevel } from '@/graphql/graphql';
import {
  ContestsDataIndex,
  useSearchContests,
} from '@/hooks/admin/manage-contests';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { ContestFields } from '@/utils/fields';
import {
  contestMappedStatus,
  getMapperLabel,
  studentMappedLevels,
} from '@/utils/mapper';
import { PlusOutlined } from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

import { TableBtn } from './dashboard';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import UpdateContest from '@/components/admin/contests/UpdateContest';
const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const ManageContests = () => {
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

  const refetchData = () => {
    methods.refetch();
  };

  const columns: ColumnsType<ColumnType<Contest>> = [
    {
      title: 'عنوان المسابقة',
      dataIndex: ContestFields.title,
      key: ContestFields.title,
      ...getColumnSearchProps(ContestFields.title),
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
      title: 'عدد المتسابقين',
      dataIndex: ContestFields.participants,
      key: ContestFields.participants,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === ContestFields.participants
          ? sortedInfo.order
          : null,
      render: (data: string[]) => `${data.length} متسابق`,
    },
    {
      title: 'مستوى المسابقة',
      dataIndex: ContestFields.level,
      key: ContestFields.level,
      filters: studentMappedLevels,
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.level || null,
      render: (levels: StudentLevel[]) => {
        return levels?.map((level) => {
          return (
            <Tag color="warning" key={level}>
              {getMapperLabel<StudentLevel>(studentMappedLevels, level)}
            </Tag>
          );
        });
      },
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

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <StyledSection>
      <TableBtn
        type="primary"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showDrawer}
      >
        مسابقة جديدة
      </TableBtn>
      <TableBtn onClick={methods.clearAllFilters}>إعادة الضبط</TableBtn>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        size="large"
        onChange={methods.handleTableChange}
        pagination={methods.handlePagination}
        style={{ minHeight: 400 }}
      />
      <CreateContest
        visible={visible}
        onClose={onClose}
        onSuccess={refetchData}
      />
    </StyledSection>
  );
};

ManageContests.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageContests;
