import { Table } from 'antd';
import moment from 'moment-timezone';

import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import { Contest } from '@/graphql/graphql';
import { ContestsDataIndex } from '@/hooks/admin/manage-contests.hook';
import { ContestFields } from '@/utils/fields';

import type { ColumnsType, ColumnType, TableProps } from 'antd/es/table';
import {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import styled from '@emotion/styled';
import { TableBtn } from '@/pages/admin/dashboard';
import { PlusOutlined } from '@ant-design/icons';
import CreateContest from '@/components/admin/contests/CreateContest';
import { useState } from 'react';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

export type TeacherContestsType = {
  isPremium?: boolean;
  id: string;
};

type ContestsTableType = {
  isPremium: boolean;
  sortedInfo: SorterResult<ColumnType<Contest>[]>;
  filteredInfo: Record<string, FilterValue>;
  data: object[];
  loading: boolean;
  methods: {
    handleTableChange: TableProps<ColumnType<Contest>>['onChange'];
    handlePagination: {
      total: number;
      pageSize: number;
      pageSizeOptions: string[];
      showSizeChanger: boolean;
      onShowSizeChange: (page: number, pageSize: number) => void;
      onChange: (page: number, pageSize: number) => void;
    };
    handleSearch: (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: keyof Contest
    ) => void;
    handleFilter: (
      value: string | number | boolean,
      record: Contest
    ) => boolean;
    handleReset: (clearFilters: () => void) => void;
    refetch: () => void;
  };
  extendColumns?: ColumnsType<ColumnType<Contest>>;
};

const ContestsTable = ({
  data,
  filteredInfo,
  sortedInfo,
  loading,
  methods,
  extendColumns,
  isPremium,
}: ContestsTableType) => {
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
  ];
  if (extendColumns) {
    columns.push(...extendColumns);
  }

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <StyledSection>
      {isPremium && (
        <TableBtn
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={showDrawer}
        >
          مسابقة جديدة
        </TableBtn>
      )}
      <TableBtn>إعادة الضبط</TableBtn>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        size="large"
        onChange={methods.handleTableChange}
        pagination={methods.handlePagination}
        style={{ minHeight: 500 }}
      />
      {isPremium && (
        <CreateContest
          visible={visible}
          onClose={onClose}
          onSuccess={() => methods.refetch()}
        />
      )}
    </StyledSection>
  );
};

export default ContestsTable;
