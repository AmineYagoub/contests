import { useState } from 'react';

import {
  Answer,
  OrderAnswerArgs,
  usePaginateAnswersQuery,
  WhereAnswerArgs,
} from '@/graphql/graphql';
import { Pagination } from '@/utils/types';

import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';

export type AnswersDataIndex = keyof Answer;

export const useFindAnswersForStudents = (id?: string) => {
  const init: WhereAnswerArgs = {};
  if (id) {
    init.teacherId = id;
  }

  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereAnswerArgs>(init);
  const [orderBy, setOrderBy] = useState<OrderAnswerArgs>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Answer>> | SorterResult<ColumnType<Answer>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Answer) => {
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
    setWhere(init);
    setOrderBy({});
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const { data, loading, refetch } = usePaginateAnswersQuery({
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
    dataIndex: AnswersDataIndex
  ) => {
    confirm();
  };

  const methods = {
    refetch,
    handleReset,
    handleFilter,
    handleSearch,
    clearAllFilters,
    handlePagination: {
      total: data?.paginateAnswers?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return {
    methods,
    data: data?.paginateAnswers?.data.map((d) => ({ key: d.id, ...d })) ?? [],
    loading,
    filteredInfo,
    sortedInfo,
  };
};
