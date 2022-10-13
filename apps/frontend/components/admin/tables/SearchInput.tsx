import { Button, Input, Space } from 'antd';
import { useRef } from 'react';
import type { InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  FilterConfirmProps,
  FilterDropdownProps,
} from 'antd/es/table/interface';

export interface SearchInputProps<T> extends FilterDropdownProps {
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: T
  ) => void;
  handleReset: (param: () => void) => void;
  dataIndex: T;
}

export function SearchInput<T>(props: SearchInputProps<T>) {
  const searchInput = useRef<InputRef>(null);
  const {
    dataIndex,
    selectedKeys,
    setSelectedKeys,
    confirm,
    handleSearch,
    clearFilters,
    handleReset,
  } = props;
  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder="البحث عن ..."
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          البحث
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          مسح
        </Button>
      </Space>
    </div>
  );
}

export const SearchIcon = ({ filtered }: { filtered: boolean }) => (
  <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
);
