import { Contest } from '@/graphql/graphql';
import { useSearchContests } from '@/hooks/admin/manage-contests.hook';

import { Space } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import DeleteContest from '@/components/admin/contests/DeleteContest';
import UpdateContest from '@/components/admin/contests/UpdateContest';
import ContestsTable, {
  TeacherContestsType,
} from '@/components/profile/common/ContestsTable';
import { ContestFields } from '@/utils/fields';

const PremiumContest = ({ id, isPremium = true }: TeacherContestsType) => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests(id);

  const refetchData = () => {
    methods.refetch();
  };

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
  ];

  if (isPremium) {
    columns.push({
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record) => (
        <Space size="small">
          <DeleteContest record={record} onSuccess={refetchData} />
          <UpdateContest record={record} onSuccess={refetchData} />
        </Space>
      ),
    });
  }

  return (
    <ContestsTable
      isPremium={isPremium}
      extendColumns={columns}
      data={data}
      loading={loading}
      methods={methods}
      filteredInfo={filteredInfo}
      sortedInfo={sortedInfo as SorterResult<ColumnType<Contest>[]>}
    />
  );
};

export default PremiumContest;
