import { Space, Table, Tag } from 'antd';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';

import CreateContest from '@/components/admin/contests/CreateContest';
import DeleteContest from '@/components/admin/contests/DeleteContest';
import UpdateContest from '@/components/admin/contests/UpdateContest';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import {
  Contest,
  ContestStatus,
  PermissionTitle,
  StudentLevel,
} from '@/graphql/graphql';
import {
  ContestsDataIndex,
  useSearchContests,
} from '@/hooks/admin/manage-contests.hook';
import AdminLayout from '@/layout/AdminLayout';
import { ContestFields } from '@/utils/fields';
import {
  contestMappedStatus,
  getLevelsLabel,
  getMapperLabel,
  studentMappedLevels,
} from '@/utils/mapper';
import { PlusOutlined } from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

import { TableBtn } from './dashboard';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import { withAuth } from '@/components/common/withAuth';
const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const ManageContests = () => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests();

  const [participants, setParticipants] = useState(
    'جاري فرز المتسابقين ... يرجى تحديث الصفحة بعد قليل'
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setParticipants(null);
    }, 15 * 1000);

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
        style={{ minHeight: 500 }}
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
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageContests, [PermissionTitle.AccessDashboard]);
