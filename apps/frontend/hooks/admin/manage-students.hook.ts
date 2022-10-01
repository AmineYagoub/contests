import { useState } from 'react';

import { Pagination } from '@/utils/types';

import type {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
export interface StudentsDataType {
  key: string;
  name: string;
  email: string;
  age: number;
  nationality: string;
  role: string;
  isActive: boolean;
  created: Date;
}

export type StudentsDataIndex = keyof StudentsDataType;

const data: StudentsDataType[] = [
  {
    key: '1',
    email: 'eamil@yahoo.com',
    role: 'مع مشرف',
    created: new Date(),
    name: 'John Brown',
    age: 32,
    isActive: true,
    nationality: 'مصر',
  },
  {
    key: '2',
    email: 'eamil@yahoo.com',
    role: 'بدون مشرف',
    created: new Date(),
    name: 'Joe Black',
    age: 42,
    isActive: true,
    nationality: 'مصر',
  },
  {
    key: '3',
    email: 'eamil@yahoo.com',
    role: 'بدون مشرف',
    created: new Date(),
    name: 'Jim Green',
    age: 32,
    isActive: true,
    nationality: 'مصر',
  },
  {
    key: '4',
    email: 'eamil@yahoo.com',
    role: 'مع مشرف',
    created: new Date(),
    name: 'Jim Red',
    age: 32,
    isActive: true,
    nationality: 'مصر',
  },
];

export const useSearchAndFilter = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: StudentsDataIndex
  ) => {
    confirm();
    console.log(dataIndex, selectedKeys);
  };

  const handleFilter = (
    value: string | number | boolean,
    record: StudentsDataType
  ) => {
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

  const handleTableChange = (
    _: unknown,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<unknown>
  ) => {
    console.log(filters, sorter);
  };

  const methods = {
    handleReset,
    handleSearch,
    handleFilter,
    handleTableChange,
    handlePagination: {
      total: pagination.total,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return { methods, data };
};
