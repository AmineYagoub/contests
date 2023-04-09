import { QuestionFields } from '@/utils/fields';
import { dictationMappedLevels } from '@/utils/mapper';
import { Form, Select } from 'antd';

const SelectDictationLevel = ({
  isContest = false,
}: {
  isContest?: boolean;
}) => {
  return (
    <Form.Item
      name={QuestionFields.dictationLevel}
      label="مستوى سؤال الاملاء"
      style={{ minWidth: 230 }}
      rules={[
        { required: isContest, message: 'يرجى تحديد مستوى سؤال الاملاء.' },
      ]}
    >
      <Select
        allowClear
        showArrow
        options={dictationMappedLevels}
        placeholder="حدد المستوى"
      />
    </Form.Item>
  );
};

export default SelectDictationLevel;
