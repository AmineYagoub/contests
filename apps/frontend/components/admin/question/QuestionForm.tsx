import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import SelectTags from '@/components/common/SelectTags';
import { Question } from '@/graphql/graphql';
import { QuestionFields } from '@/utils/fields';
import { questionMappedTypes } from '@/utils/mapper';
import { QuestionState } from '@/valtio/question.state';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledInput = styled(Input)({
  maxWidth: '95%',
  marginRight: '10px !important',
});

const QuestionForm = ({
  form,
  record,
}: {
  form: FormInstance;
  record?: Question;
}) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        title: record.title,
        lesson: record.lesson,
        type: record.type,
        options: [record.correctAnswer, ...record.options],
        tags: record.tags.map((tag) => ({
          value: tag.title,
          label: tag.title,
        })),
      });
    }
    return () => form.resetFields();
  }, [form, record]);

  const questionsSnap = useSnapshot(QuestionState);
  return (
    <>
      {questionsSnap.mutationLoading && (
        <Spin
          size="large"
          style={{ position: 'absolute', left: '50%', top: '25%' }}
        />
      )}

      <Form
        layout="vertical"
        hideRequiredMark
        scrollToFirstError
        form={form}
        name={`${record} ? update-question : create-question`}
        style={{
          opacity: questionsSnap.mutationLoading ? '0.15' : 1,
        }}
      >
        <Form.Item
          name={QuestionFields.title}
          label="السؤال"
          rules={[{ required: true, message: 'يرجى كتابة نص السؤال' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={QuestionFields.lesson}
          label="الدرس المستفاد من السؤال"
          rules={[
            { required: true, message: 'يرجى كتابة الدرس المستفاد من السؤال' },
          ]}
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
            <SelectTags />
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
                  أضف خيارات الإجابة
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default QuestionForm;
