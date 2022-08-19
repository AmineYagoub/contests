import { Button, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment-timezone';
import { useState } from 'react';

import CreateQuestion from '@/components/admin/question/CreateQuestion';
import DeleteQuestion from '@/components/admin/question/DeleteQuestion';
import ImportQuestions from '@/components/admin/question/ImportQuestions';
import UpdateQuestion from '@/components/admin/question/UpdateQuestion';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import {
  Question,
  QuestionType,
  StudentLevel,
  Tag as TagModel,
} from '@/graphql/graphql';
import {
  QuestionsDataIndex,
  useSearchQuestions,
} from '@/hooks/admin/manage-questions';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { QuestionFields } from '@/utils/fields';
import {
  getMapperLabel,
  questionMappedTypes,
  studentMappedLevels,
} from '@/utils/mapper';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

import { TableBtn } from './dashboard';

import type { ColumnsType, ColumnType } from 'antd/es/table';
const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const ManageQuestions = () => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchQuestions();

  const refetchData = () => {
    methods.refetch();
  };
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const getColumnSearchProps = (
    dataIndex: QuestionsDataIndex
  ): ColumnType<Question> => ({
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
    dataIndex: QuestionsDataIndex
  ): ColumnType<Question> => ({
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

  const columns: ColumnsType<ColumnType<Question>> = [
    {
      title: 'السؤال',
      dataIndex: QuestionFields.title,
      key: QuestionFields.title,
      ...getColumnSearchProps(QuestionFields.title),
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: QuestionFields.created,
      key: QuestionFields.created,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === QuestionFields.created
          ? sortedInfo.order
          : null,
      ...getColumnSearchDateProps(QuestionFields.created),
    },
    {
      title: 'الموضوعات',
      dataIndex: QuestionFields.tags,
      key: QuestionFields.tags,
      ...getColumnSearchProps(QuestionFields.tags),
      render: (tags: TagModel[]) => {
        return tags?.map((tag) => {
          return (
            <Tag color="green" key={tag.title}>
              {tag.title}
            </Tag>
          );
        });
      },
    },
    {
      title: 'صعوبة السؤال',
      key: QuestionFields.type,
      dataIndex: QuestionFields.type,
      filters: questionMappedTypes,
      filterMultiple: false,
      onFilter: methods.handleFilter,
      filteredValue: filteredInfo.type || null,
      render: (type: QuestionType) => {
        let color = type === QuestionType.Easy ? 'green' : 'volcano';
        if (type === QuestionType.Medium) {
          color = 'blue';
        }
        return (
          <Tag color={color} key={type}>
            {getMapperLabel<QuestionType>(questionMappedTypes, type)}
          </Tag>
        );
      },
    },
    {
      title: 'المستوى المستهدف',
      dataIndex: QuestionFields.level,
      key: QuestionFields.level,
      filters: studentMappedLevels,
      filterMultiple: true,
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
      title: 'عدد الخيارات',
      dataIndex: QuestionFields.options,
      key: QuestionFields.options,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === QuestionFields.options
          ? sortedInfo.order
          : null,
      render: (options) => options?.length,
    },
    {
      title: 'مرات الإستخدام',
      key: QuestionFields.usedCount,
      dataIndex: QuestionFields.usedCount,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === QuestionFields.usedCount
          ? sortedInfo.order
          : null,
    },
    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record) => (
        <Space size="small">
          <DeleteQuestion record={record} onSuccess={refetchData} />
          <UpdateQuestion record={record} onSuccess={refetchData} />
        </Space>
      ),
    },
  ];

  return (
    <StyledSection>
      <ImportQuestions />
      <TableBtn
        type="primary"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showDrawer}
      >
        سؤال جديد
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
      <CreateQuestion
        visible={visible}
        onClose={onClose}
        onSuccess={refetchData}
      />
    </StyledSection>
  );
};

ManageQuestions.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default ManageQuestions;
