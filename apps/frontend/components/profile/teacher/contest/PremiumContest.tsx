import { Space } from 'antd';
import { ContestFields } from '@/utils/fields';
import { SorterResult } from 'antd/es/table/interface';
import { Contest, Teacher, User } from '@/graphql/graphql';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import DeleteContest from '@/components/admin/contests/DeleteContest';
import UpdateContest from '@/components/admin/contests/UpdateContest';
import ContestsTable from '@/components/profile/common/ContestsTable';
import { useSearchContests } from '@/hooks/admin/manage-contests.hook';

const PremiumContest = ({ user }: { user: User }) => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests(user.id);

  const refetchData = () => {
    methods.refetch();
  };

  const allowedContests = (user.profile as Teacher).subscription
    ?.memberShipOn[0]?.allowedContests;
  const contestCount = (user.profile as Teacher).subscription?.contestCount;

  // todo change profile bucket to public

  const columns: ColumnsType<ColumnType<Contest>> = [
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
      render: (data: string[]) => `${data.length} طالب`,
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
    <ContestsTable
      data={data}
      loading={loading}
      methods={methods}
      extendColumns={columns}
      filteredInfo={filteredInfo}
      contestCount={contestCount}
      allowedContests={allowedContests}
      sortedInfo={sortedInfo as SorterResult<ColumnType<Contest>[]>}
    />
  );
};

export default PremiumContest;
