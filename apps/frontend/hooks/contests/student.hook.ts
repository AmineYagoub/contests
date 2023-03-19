import { TableProps } from 'antd/es/table';
import { useState } from 'react';

import {
  Contest,
  OrderByType,
  OrderContestArgs,
  usePaginateContestsQuery,
  WhereContestArgs,
} from '@/graphql/graphql';
import { ContestFields } from '@/utils/fields';
import { Pagination } from '@/utils/types';

import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';

export type ContestsDataIndex = keyof Contest;

type ContestWhereInit = {
  participants: string[];
  answerBy?: string;
  noAnswerBy?: string;
};

export const useFindContestsForStudents = (
  id: string,
  isCompleted: boolean
) => {
  const user: ContestWhereInit = {
    participants: [id],
  };
  if (isCompleted) {
    user.answerBy = id;
  } else {
    user.noAnswerBy = id;
  }
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereContestArgs>(user);
  const [orderBy, setOrderBy] = useState<OrderContestArgs>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Contest>> | SorterResult<ColumnType<Contest>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Contest) => {
    return true;
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const clearAllFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setPagination({
      offset: 0,
      limit: 10,
    });
    setWhere(user);
    setOrderBy({});
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const { data, loading, refetch } = usePaginateContestsQuery({
    variables: {
      params: {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    },
    ssr: false,
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: ContestsDataIndex
  ) => {
    confirm();
  };

  const handleTableChange: TableProps<ColumnType<Contest>>['onChange'] = (
    _,
    filters,
    sorter: SorterResult<Contest>
  ) => {
    const { field, order } = sorter;
    const o: OrderContestArgs = {};

    if (order) {
      for (const key in ContestFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereContestArgs = user;

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        w[key] = [ContestFields.startTime, ContestFields.created].includes(
          key as 'created' | 'startTime'
        )
          ? value
          : value[0];
      }
    }

    setOrderBy(o);
    setWhere(w);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const methods = {
    refetch,
    handleReset,
    handleFilter,
    handleSearch,
    handleTableChange,
    clearAllFilters,
    handlePagination: {
      total: data?.paginateContest?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return {
    methods,
    data: data?.paginateContest?.data.map((d) => ({ key: d.id, ...d })) ?? [],
    loading,
    filteredInfo,
    sortedInfo,
  };
};
