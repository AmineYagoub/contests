import {
  Alert,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import {
  ContestLevel,
  ContestStatus,
  useCreateContestMutation,
} from 'graphql/graphql';
import moment from 'moment';

import { ContestFields } from '@/utils/fields';
import { SaveOutlined } from '@ant-design/icons';

import type { RangePickerProps } from 'antd/es/date-picker';
const { Option } = Select;

/**
 * Can not select days before today and today.
 *
 * @param current - current date
 * @returns - function that can be used in DatePicker's onChange callback
 */
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < moment().endOf('day');
};

const CreateContest = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [createContestMutation, { loading, error }] =
    useCreateContestMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await createContestMutation({
        variables: {
          input: {
            ...values,
            status: ContestStatus.NotStarted,
            authorId: 1,
          },
        },
      });
      if (data) {
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="إنشاء مسابقة جديدة"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
      bodyStyle={{ paddingBottom: 80 }}
      width={720}
      extra={
        <Space>
          <Button onClick={onClose} htmlType="reset">
            تراجع
          </Button>
          <Button
            onClick={onFinish}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            form="create-contest"
            loading={loading}
          >
            حفظ
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        hideRequiredMark
        scrollToFirstError
        form={form}
        name="create-contest"
        initialValues={{
          duration: 40,
          questionCount: 100,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={ContestFields.title}
              label="عنوان المسابقة"
              rules={[{ required: true, message: 'يرجى كتابة عنوان للمسابقة' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={ContestFields.level}
              label="مستوى المسابقة"
              rules={[{ required: true, message: 'يرجى تحديد مستوى المسابقة' }]}
            >
              <Select mode="tags" allowClear showArrow>
                <Option value={ContestLevel.Thirteen}>13</Option>
                <Option value={ContestLevel.Fourteen}>14</Option>
                <Option value={ContestLevel.Fifteen}>15</Option>
                <Option value={ContestLevel.Sixteen}>16</Option>
                <Option value={ContestLevel.Seventeen}>17</Option>
                <Option value={ContestLevel.Eighteen}>18</Option>
                <Option value={ContestLevel.Nineteen}>19</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={ContestFields.startTime}
              label="تاريخ البدء"
              rules={[
                { required: true, message: 'يرجى تحديد تاريخ بدء المسابقة' },
              ]}
              help="توقيت القاهرة"
            >
              <DatePicker
                showTime
                showToday
                allowClear
                style={{ width: '100%' }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={ContestFields.duration}
              label="مدة المسابقة"
              rules={[{ required: true, message: 'يرجى تحديد مدة المسابقة' }]}
              help="المدة الزمنية بالدقائق"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={ContestFields.questionCount}
              label="عدد أسئلة المسابقة"
              rules={[
                { required: true, message: 'يرجى تحديد عدد أسئلة المسابقة' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={ContestFields.maxParticipants}
              label="الحد الأقصى لعدد المشاركين"
              help="أتركه فارغاً للسماح بعدد لا نهائي"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {error && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء إنشاء المسابقة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreateContest;
