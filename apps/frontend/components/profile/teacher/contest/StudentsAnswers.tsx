import {
  ContestsDataIndex,
  useFindContestsForStudents,
} from '@/hooks/contests/student.hook';
import {
  SearchDatePicker,
  SearchDatePickerIcon,
} from '@/components/admin/tables/SearchDatePicker';
import { Button, Table, Tag, Tooltip } from 'antd';
import moment from 'moment-timezone';
import { Answer, Contest } from '@/graphql/graphql';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { getMapperLabel, rolesMappedTypes } from '@/utils/mapper';
import { SearchIcon, SearchInput } from '@/components/admin/tables/SearchInput';
import { useFindAnswersForStudents } from '@/hooks/contests/answer.hook';
import { BarChartOutlined } from '@ant-design/icons';

const StudentsAnswers = ({ id }: { id?: string }) => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useFindAnswersForStudents(id);

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
    render: (date: string | number | Date) => (
      <span>{moment(date).calendar()}</span>
    ),
  });

  const columns: ColumnsType<ColumnType<Answer>> = [
    {
      title: 'إسم الطالب',
      key: '1',
      render(record: Answer) {
        const { firstName, lastName } = record.userId.profile;
        return (
          <>
            <b>
              {firstName} {lastName}
            </b>
            <br />
            <Tag color="green">
              {getMapperLabel(rolesMappedTypes, record.userId.role.title)}
            </Tag>
          </>
        );
      },
    },
    {
      title: 'عنوان المسابقة',
      key: '2',
      render(record: Answer) {
        return <span>{record.contest.title}</span>;
      },
    },
    {
      title: 'تاريخ المشاركة',
      dataIndex: 'created',
      key: '3',
      render: (date: string | number | Date) => (
        <span>{moment(date).calendar()}</span>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record: Answer) => (
        <Tooltip title="مشاهدة نتيجة المسابقة" color="purple">
          <Button
            icon={<BarChartOutlined />}
            shape="circle"
            type="primary"
            href={`/profile/results/${record.id}?cid=${record.contest.id}`}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      size="large"
      pagination={methods.handlePagination}
      style={{ minHeight: 500 }}
    />
  );
};

export default StudentsAnswers;
