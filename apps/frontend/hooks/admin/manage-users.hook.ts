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
import { UsersActions, UsersState } from '@/valtio/user.state';
import { TableProps } from 'antd/es/table';
import { getLevelsValues } from '@/utils/mapper';
import { Logger } from '@/utils/app';

export const useSearchUsers = (
  role: 'student' | 'teacher',
  teacherId?: string
) => {
  const roles =
    role === 'student'
      ? [RoleTitle.Student, RoleTitle.StudentTeacher]
      : [RoleTitle.Teacher, RoleTitle.GoldenTeacher];
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [where, setWhere] = useState<WhereUserArgs>({
    role: roles,
    teacherId,
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
    setWhere({ role: roles });
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
    UsersActions.setQueryLoading(true);
    if (data) {
      UsersActions.setQueryLoading(false);
      const results = data?.paginateUsers?.data.map((d) => ({
        key: d.id,
        ...d,
      }));
      UsersActions.setUsersData(results as User[]);
    }
    return () => {
      UsersActions.setUsersData([]);
      UsersActions.setQueryLoading(false);
    };
  }, [data]);

  const refetchData = () => {
    UsersActions.setQueryLoading(true);
    refetch()
      .then(({ data }) => {
        const results = data?.paginateUsers?.data.map((d) => ({
          key: d.id,
          ...d,
        }));
        UsersActions.setUsersData(results as User[]);
      })
      .finally(() => {
        UsersActions.setQueryLoading(false);
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
      role: roles,
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

export const useUpdateUsers = () => {
  const [UpdateUserMutation, { loading }] = useUpdateUserMutation();

  const onUserStateChange = (value: boolean, id: string) => {
    try {
      UpdateUserMutation({
        variables: { id: id, input: { isActive: value } },
      }).then(() => {
        for (const el of UsersState.users) {
          if (el.id === id) {
            el.isActive = value;
          }
        }
      });
    } catch (error) {
      Logger.log(error);
    }
  };

  const onTeacherRoleChange = (value: boolean, id: string) => {
    try {
      const role = value ? RoleTitle.GoldenTeacher : RoleTitle.Teacher;
      UpdateUserMutation({
        variables: { id: id, input: { role } },
      }).then(() => {
        for (const el of UsersState.users) {
          if (el.id === id) {
            el.role.title = role;
          }
        }
      });
    } catch (error) {
      Logger.log(error);
    }
  };

  return { loading, onUserStateChange, onTeacherRoleChange };
};
