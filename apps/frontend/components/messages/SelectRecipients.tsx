import { Form, Select } from 'antd';
import { Student, useFindStudentsQuery } from '@/graphql/graphql';
import { MessageRecipients } from '@/utils/types';

const { Option } = Select;
const SelectRecipients = ({ teacherId = null }: { teacherId?: string }) => {
  const { data, loading, refetch } = useFindStudentsQuery({
    variables: {
      teacherId,
    },
  });

  const handleSearch = async (newValue: string) => {
    await refetch({
      name: newValue,
    });
  };

  return (
    <Form.Item
      name="recipients"
      label="حدد المرسل إليهم"
      rules={[
        {
          required: true,
          message: 'يرجى تحديد على الأقل مستخدم واحد',
        },
      ]}
    >
      <Select
        mode="multiple"
        showArrow
        allowClear
        filterOption={false}
        showSearch
        onSearch={handleSearch}
        loading={loading}
      >
        <Option
          value={MessageRecipients.STUDENTS}
          key={MessageRecipients.STUDENTS}
        >
          كل الطلاب
        </Option>
        {!teacherId && (
          <>
            <Option
              value={MessageRecipients.STUDENTS_TEACHERS}
              key={MessageRecipients.STUDENTS_TEACHERS}
            >
              كل الطلاب المرتبطين بمشرفين
            </Option>
            <Option
              value={MessageRecipients.FREE_STUDENTS}
              key={MessageRecipients.FREE_STUDENTS}
            >
              كل الطلاب الغير مرتبطين بمشرفين
            </Option>
            <Option
              value={MessageRecipients.TEACHERS}
              key={MessageRecipients.TEACHERS}
            >
              كل المعلمين
            </Option>
            <Option
              value={MessageRecipients.GOLDEN_TEACHERS}
              key={MessageRecipients.GOLDEN_TEACHERS}
            >
              كل المعلمين الذهبيين
            </Option>
            <Option
              value={MessageRecipients.FREE_TEACHERS}
              key={MessageRecipients.FREE_TEACHERS}
            >
              كل المعلمين الغير ذهبيين
            </Option>
            <Option value={MessageRecipients.ALL} key={MessageRecipients.ALL}>
              كل المستخدمين
            </Option>
          </>
        )}

        {data?.findStudents.map((el) => {
          const { firstName, lastName } = el.profile as Student;
          return (
            <Option value={el.id} key={el.id}>
              {`${firstName} ${lastName}`}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default SelectRecipients;
