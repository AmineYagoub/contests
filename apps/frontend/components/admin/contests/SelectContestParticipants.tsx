import { Form, Select } from 'antd';
import { Student, useFindStudentsQuery } from '@/graphql/graphql';
import { ContestFields } from '@/utils/fields';

const { Option } = Select;
const SelectContestParticipants = ({
  teacherId = null,
}: {
  teacherId?: string;
}) => {
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
      name={ContestFields.participants}
      label="الطلاب المستهدفين"
      help="لن تظهر المسابقة إلا للطبة المحددين في هذا الحقل"
      rules={[
        {
          required: !!teacherId,
          message: 'يرجى تحديد الطلاب المشاركين في المسابقة',
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

export default SelectContestParticipants;
