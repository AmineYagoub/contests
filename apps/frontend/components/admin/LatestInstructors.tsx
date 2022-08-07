import { formatDate } from '@/utils/app';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'الإسم الكامل',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'تاريخ التسجيل',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'الجنسية',
    dataIndex: 'address',
    key: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'أحمد عمر 1',
    age: formatDate(new Date()),
    address: 'مصر',
  },
  {
    key: '2',
    name: 'أحمد عمر 2',
    age: formatDate(new Date()),
    address: 'السعودية',
  },
  {
    key: '3',
    name: 'أحمد عمر 3',
    age: formatDate(new Date()),
    address: 'مصر',
  },
  {
    key: '4',
    name: 'أحمد عمر 4',
    age: formatDate(new Date()),
    address: 'الأردن',
  },
  {
    key: '5',
    name: 'أحمد عمر 5',
    age: formatDate(new Date()),
    address: 'الكويت',
  },
];

const LatestInstructors = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ hideOnSinglePage: true }}
      title={() => 'آخر المعلمين المسجلين'}
    />
  );
};

export default LatestInstructors;
