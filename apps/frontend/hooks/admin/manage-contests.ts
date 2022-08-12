import { TableProps } from 'antd/es/table';
import { useState } from 'react';

import {
  Contest,
  OrderType,
  usePaginateContestsQuery,
  WhereType,
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

export const useSearchContests = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereType>(null);
  const [orderBy, setOrderBy] = useState<OrderType>(null);
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

  const { data, loading } = usePaginateContestsQuery({
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
    sorter
  ) => {
    const { field, order } = sorter;
    const o: OrderType = {};

    if (order) {
      for (const key in ContestFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? 'asc' : 'desc';
          break;
        }
      }
    }

    const w: WhereType = {};
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
