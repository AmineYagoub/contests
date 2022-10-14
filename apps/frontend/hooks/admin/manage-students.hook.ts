import { useEffect, useState } from 'react';

import { Pagination } from '@/utils/types';

import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { StudentFields, StudentsDataIndex, UserFields } from '@/utils/fields';
import {
  OrderByType,
  OrderUserArgs,
  RoleTitle,
  Student,
  usePaginateUsersQuery,
  User,
  useUpdateUserMutation,
  WhereUserArgs,
} from '@/graphql/graphql';
import { StudentActions, StudentState } from '@/valtio/student.state';
import { TableProps } from 'antd/es/table';
import { getLevelsValues } from '@/utils/mapper';

export const useSearchStudents = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereUserArgs>({
    role: [RoleTitle.Student, RoleTitle.StudentTeacher],
  });
  const [orderBy, setOrderBy] = useState<OrderUserArgs>({});
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
    setWhere({ role: [RoleTitle.Student, RoleTitle.StudentTeacher] });
    setOrderBy({});
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: StudentsDataIndex
  ) => {
    confirm();
  };

  const handleFilter = (value: string | number | boolean, record: Student) => {
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

  const { data, refetch } = usePaginateUsersQuery({
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
    StudentActions.setQueryLoading(true);
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

    const w: WhereUserArgs = {
      role: [RoleTitle.Student, RoleTitle.StudentTeacher],
    };
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        w[key] =
          key === UserFields.created
            ? value
            : key === StudentFields.level
            ? getLevelsValues(String(value))
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
    refetchData,
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

export const useUpdateStudents = () => {
  const [UpdateUserMutation, { loading }] = useUpdateUserMutation();

  const onUserStateChange = (value: boolean, id: string) => {
    UpdateUserMutation({
      variables: { id: id, input: { isActive: value } },
    }).then(() => {
      for (const el of StudentState.students) {
        if (el.id === id) {
          el.isActive = value;
        }
      }
    });
  };
  return { loading, onUserStateChange };
};
