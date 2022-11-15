import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Spin,
  Typography,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import { SubscriptionPlan } from '@/graphql/graphql';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { SubscriptionPlanState } from '@/valtio/plans.state';

const { Title } = Typography;

const StyledInput = styled(Input)({
  maxWidth: '95%',
  marginRight: '10px !important',
});

const StyledH4Title = styled(Title)({
  marginTop: 20,
});

const SubscriptionPlanForm = ({
  form,
  record,
}: {
  form: FormInstance;
  record?: SubscriptionPlan;
}) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        title: record.title,
        subTitle: record.subTitle,
        price: Number(record.price / 100).toFixed(2),
        options: record.options,
        allowedContests:
          record.allowedContests === -1 ? null : record.allowedContests,
        period: record.period === -1 ? null : record.period,
      });
    }
    return () => form.resetFields();
  }, [form, record]);

  const planSnap = useSnapshot(SubscriptionPlanState);
  return (
    <>
      {planSnap.mutationLoading && (
        <Spin
          size='large'
          style={{ position: 'absolute', left: '50%', top: '25%' }}
        />
      )}

      <Form
        layout='vertical'
        scrollToFirstError
        form={form}
        name={`${record} ? update-plan : create-plan`}
        style={{
          opacity: planSnap.mutationLoading ? '0.15' : 1,
        }}
      >
        <Form.Item
          name='title'
          label='عنوان الخطة'
          rules={[{ required: true, message: 'يرجى كتابة عنوان الخطة' }]}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='subTitle'
          label='الوصف'
          rules={[{ required: true, message: 'يرجى كتابة وصف الخطة' }]}
          required
        >
          <Input />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item
              name='price'
              label='السعر'
              rules={[{ required: true, message: 'يرجى كتابة سعر الخطة' }]}
              required
            >
              <InputNumber
                formatter={(value) =>
                  value
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : ''
                }
                parser={(value: string) => value?.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='period'
              label='المدة الزمنية بالأيام'
              help='أتركه فارغا للخطة الغير منتهية.'
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name='allowedContests'
              label='عدد المسابقات المسموح بإنشائها كل شهر'
              help='أتركه فارغا للسماح بإنشاء عدد لا نهائي من المسابقات.'
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <StyledH4Title level={4}>صلاحيات الخطة</StyledH4Title>
        <Form.List
          name='options'
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
                <Form.Item required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'يرجى كتابة هذا الخيار أو إحذف هذا الحقل.',
                      },
                    ]}
                    noStyle
                  >
                    <StyledInput placeholder={` خيار ${index + 1}`} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  style={{ width: 'calc(50% - 10px)' }}
                  icon={<PlusOutlined />}
                >
                  أضف جديد
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

export default SubscriptionPlanForm;
