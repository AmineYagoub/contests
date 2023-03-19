import moment from 'moment-timezone';
import { Button, Table, Tag, Tooltip } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { Answer, RoleTitle } from '@/graphql/graphql';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { getMapperLabel, rolesMappedTypes } from '@/utils/mapper';
import { useFindAnswersForStudents } from '@/hooks/contests/answer.hook';

const StudentsAnswers = ({ id }: { id?: string }) => {
  const { methods, data, loading } = useFindAnswersForStudents(id);

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
      title: 'منشئ المسابقة',
      key: '4',
      render(record: Answer) {
        const { firstName, lastName } = record.contest.authorId.profile;
        const { role } = record.contest.authorId;
        return (
          <>
            <b>
              {firstName} {lastName}
            </b>
            <br />
            <Tag color={role.title === RoleTitle.Admin ? 'green' : 'gold'}>
              {getMapperLabel(rolesMappedTypes, role.title)}
            </Tag>
          </>
        );
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
