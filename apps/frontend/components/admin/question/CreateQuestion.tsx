import {
  Alert,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';

import {
  Question,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/graphql/graphql';
import { QuestionFields } from '@/utils/fields';
import { questionMappedTypes, studentMappedLevels } from '@/utils/mapper';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledInput = styled(Input)({
  maxWidth: '95%',
  marginRight: '10px !important',
});

const CreateQuestion = ({
  visible,
  onClose,
  onSuccess,
  record,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  record?: Question;
}) => {
  const [form] = Form.useForm();
  const [CreateQuestionMutation, { loading, error }] =
    useCreateQuestionMutation();
  const [
    UpdateQuestionMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateQuestionMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const data = record
        ? await UpdateQuestionMutation({
            variables: {
              input: values,
              id: Number(record.id),
            },
          })
        : await CreateQuestionMutation({
            variables: {
              input: {
                ...values,
                authorId: 1,
              },
            },
          });
      if (data) {
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="إنشاء سؤال جديد"
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
            form="create-question"
            loading={loading || loadingUpdate}
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
        name="create-question"
        initialValues={{
          title: record?.title,
          type: record?.type,
          level: record?.level,
          options: record?.options,
        }}
      >
        <Form.Item
          name={QuestionFields.title}
          label="السؤال"
          rules={[{ required: true, message: 'يرجى كتابة نص السؤال' }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name={QuestionFields.type} label="صعوبة السؤال">
              <Select
                allowClear
                showArrow
                options={questionMappedTypes}
                fieldNames={{ label: 'text' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={QuestionFields.level}
              label="مستوى السؤال"
              rules={[{ required: true, message: 'يرجى تحديد مستوى السؤال' }]}
            >
              <Select
                mode="tags"
                allowClear
                showArrow
                options={studentMappedLevels}
                fieldNames={{ label: 'text' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.List
          name="options"
          rules={[
            {
              validator: async (_, options) => {
                if (!options || options.length < 2) {
                  return Promise.reject(new Error('أضف على الأقل خيارين'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  /* {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} */
                  label={index === 0 ? 'الجواب الصحيح' : 'جواب خاطئ'}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          'يرجى كتابة جواب لهذا الخيار أو إحذف هذا الحقل.',
                      },
                    ]}
                    noStyle
                  >
                    <StyledInput placeholder={`جواب خيار ${index + 1}`} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: 'calc(50% - 10px)' }}
                  icon={<PlusOutlined />}
                >
                  أضف خيار
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
      {(error || errorUpdate) && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء عملية حفظ السؤال ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreateQuestion;
