import { Form, Select, Space } from 'antd';
import { TimePicker } from 'antd';

const format = 'HH:mm';
const months = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const getYears = () => {
  const years = [];
  const date = new Date();
  const year = date.getFullYear();

  for (let i = 0; i <= 100; i++) {
    years.push(year - i);
  }
  return years;
};

export type DateTimeInput = {
  year: number;
  month: number;
  day: number;
  time?: string;
};

const SelectDate = ({ showTime = false }: { showTime?: boolean }) => {
  return (
    <Space wrap>
      {showTime && (
        <Form.Item
          name="time"
          noStyle
          rules={[{ required: true, message: 'يرجى تحديد الوقت' }]}
        >
          <TimePicker
            placeholder="التوقيت"
            format={format}
            style={{ maxWidth: 90 }}
          />
        </Form.Item>
      )}
      <Form.Item name="day" noStyle>
        <Select
          style={{ minWidth: 70 }}
          placeholder="اليوم"
          options={Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
            label: day,
            value: day,
          }))}
        />
      </Form.Item>

      <Form.Item name="month" noStyle>
        <Select
          style={{ minWidth: 70 }}
          placeholder="الشهر"
          options={months.map((month, i) => ({ label: month, value: i + 1 }))}
        />
      </Form.Item>

      <Form.Item name="year" noStyle>
        <Select
          style={{ minWidth: 70 }}
          placeholder="السنة"
          options={getYears().map((year) => ({
            label: year,
            value: year,
          }))}
        />
      </Form.Item>
    </Space>
  );
};

export default SelectDate;
