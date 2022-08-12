import { Button, DatePicker, Space } from 'antd';
import moment from 'moment-timezone';
import { CSSProperties } from 'react';

import { CalendarOutlined } from '@ant-design/icons';

import { SearchInputProps } from './SearchInput';

const { RangePicker } = DatePicker;
export function SearchDatePicker<T>(props: SearchInputProps<T>) {
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
    <div
      style={{
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <RangePicker
        showNow
        allowClear={false}
        dateRender={(current) => {
          const style: CSSProperties = {};
          if (current.date() === 1) {
            style.border = '1px solid #1890ff';
            style.borderRadius = '50%';
          }
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }}
        value={[moment(selectedKeys[0]), moment(selectedKeys[1])]}
        onChange={(_, formatString: [string, string]) => {
          console.log(formatString);
          setSelectedKeys(formatString);
        }}
      />
      <Space style={{ justifyContent: 'center', margin: 5 }}>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<CalendarOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          البحث
        </Button>
        <Button
          onClick={() => {
            clearFilters();
            handleReset(clearFilters);
            setSelectedKeys([]);
          }}
          size="small"
          style={{ width: 90 }}
        >
          مسح
        </Button>
      </Space>
    </div>
  );
}

export const SearchDatePickerIcon = ({ filtered }: { filtered: boolean }) => (
  <CalendarOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
);
