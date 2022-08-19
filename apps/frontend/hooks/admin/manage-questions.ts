import { TableProps } from 'antd/es/table';
import { useState } from 'react';

import {
  OrderByType,
  OrderQuestionArgs,
  Question,
  usePaginateQuestionsQuery,
  WhereQuestionArgs,
} from '@/graphql/graphql';
import { QuestionFields } from '@/utils/fields';
import { Pagination } from '@/utils/types';

import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';

export type QuestionsDataIndex = keyof Question;

export const useSearchQuestions = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereQuestionArgs>(null);
  const [orderBy, setOrderBy] = useState<OrderQuestionArgs>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Question>> | SorterResult<ColumnType<Question>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Question) => {
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
    setWhere(null);
    setOrderBy(null);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const { data, loading, refetch } = usePaginateQuestionsQuery({
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
    dataIndex: QuestionsDataIndex
  ) => {
    confirm();
  };

  const handleTableChange = (pagination, filters, sorter, extra) => {
    const { field, order } = sorter;
    const o: OrderQuestionArgs = {};

    if (order) {
      for (const key in QuestionFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereQuestionArgs = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        w[key] = key === QuestionFields.created ? value : value[0];
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
      total: data?.paginateQuestions?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return {
    methods,
    data: data?.paginateQuestions?.data.map((d) => ({ key: d.id, ...d })) ?? [],
    loading,
    filteredInfo,
    sortedInfo,
  };
};
