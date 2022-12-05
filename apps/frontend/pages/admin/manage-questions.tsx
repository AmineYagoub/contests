import { Space, Table, Tag } from 'antd';
import moment from 'moment-timezone';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

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
  PermissionTitle,
  Question,
  QuestionType,
  Tag as TagModel,
} from '@/graphql/graphql';
import { useSearchQuestions } from '@/hooks/admin/manage-questions.hook';
import AdminLayout from '@/layout/AdminLayout';
import { QuestionFields, QuestionsDataIndex } from '@/utils/fields';
import { getMapperLabel, questionMappedTypes } from '@/utils/mapper';
import { QuestionState } from '@/valtio/question.state';
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

const ManageQuestions = () => {
  const { methods, filteredInfo, sortedInfo } = useSearchQuestions();
  const questionSnap = useSnapshot(QuestionState);
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
      title: 'عدد الخيارات',
      dataIndex: QuestionFields.options,
      key: QuestionFields.options,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === QuestionFields.options
          ? sortedInfo.order
          : null,
      render: (options) => options?.length + 1, // TODO Plus correctAnswer
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
          <DeleteQuestion record={record} onSuccess={methods.refetchData} />
          <UpdateQuestion record={record} onSuccess={methods.refetchData} />
        </Space>
      ),
    },
  ];

  return (
    <StyledSection>
      <ImportQuestions onSuccess={methods.refetchData} />
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
        dataSource={questionSnap.questions}
        loading={questionSnap.queryLoading}
        size="large"
        onChange={methods.handleTableChange}
        pagination={methods.handlePagination}
        style={{ minHeight: 500 }}
      />
      <CreateQuestion
        visible={visible}
        onClose={onClose}
        onSuccess={methods.refetchData}
      />
    </StyledSection>
  );
};

ManageQuestions.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageQuestions, [PermissionTitle.AccessDashboard]);
