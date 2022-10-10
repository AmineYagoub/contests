import { useEffect, useState } from 'react';

import { Pagination } from '@/utils/types';

import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { StudentsDataIndex, UserFields } from '@/utils/fields';
import {
  OrderByType,
  OrderUserArgs,
  usePaginateUsersQuery,
  User,
  WhereUserArgs,
} from '@/graphql/graphql';
import { StudentActions } from '@/valtio/student.state';
import { TableProps } from 'antd/es/table';

export const useSearchStudents = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereUserArgs>(null);
  const [orderBy, setOrderBy] = useState<OrderUserArgs>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<User>> | SorterResult<ColumnType<User>[]>
  >({});

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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: StudentsDataIndex
  ) => {
    confirm();
    console.log(dataIndex, selectedKeys);
  };

  const handleFilter = (value: string | number | boolean, record: User) => {
    //console.log(value, record);
    return true;
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const { data, loading, refetch } = usePaginateUsersQuery({
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

  useEffect(() => {
    StudentActions.setQueryLoading(loading);
    if (data) {
      StudentActions.setQueryLoading(false);
      const results = data?.paginateUsers?.data.map((d) => ({
        key: d.id,
        ...d,
      }));
      StudentActions.setStudentsData(results as User[]);
    }
    return () => {
      StudentActions.setStudentsData([]);
      StudentActions.setQueryLoading(false);
    };
  }, [data]);

  const refetchData = () => {
    StudentActions.setQueryLoading(true);
    refetch()
      .then(({ data }) => {
        const results = data?.paginateUsers?.data.map((d) => ({
          key: d.id,
          ...d,
        }));
        StudentActions.setStudentsData(results as User[]);
      })
      .finally(() => {
        StudentActions.setQueryLoading(false);
      });
  };

  const handleTableChange: TableProps<ColumnType<User>>['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<User>
  ) => {
    const { field, order } = sorter;
    const o: OrderUserArgs = {};

    if (order) {
      for (const key in UserFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereUserArgs = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        w[key] = key === UserFields.created ? value : value[0];
      }
    }

    setOrderBy(o);
    setWhere(w);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const methods = {
    refetchData,
    handleReset,
    handleFilter,
    handleSearch,
    handleTableChange,
    clearAllFilters,
    handlePagination: {
      total: data?.paginateUsers?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return {
    methods,
    filteredInfo,
    sortedInfo,
  };
};
