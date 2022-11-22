import { Contest } from '@/graphql/graphql';
import { useSearchContests } from '@/hooks/admin/manage-contests.hook';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import ContestsTable, { TeacherContestsType } from '../../common/ContestsTable';
import { SorterResult } from 'antd/es/table/interface';
const FinishedContest = ({ isPremium = false }: TeacherContestsType) => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests();

  const columns: ColumnsType<ColumnType<Contest>> = [
    {
      title: 'عدد المشاركين',
      key: 'studentsCount',
      dataIndex: 'studentsCount',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder:
        sortedInfo.columnKey === 'studentsCount' ? sortedInfo.order : null,
    },
  ];

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

export default FinishedContest;
