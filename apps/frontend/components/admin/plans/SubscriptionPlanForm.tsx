import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import { SubscriptionPlan } from '@/graphql/graphql';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { SubscriptionPlanState } from '@/valtio/plans.state';

const StyledInput = styled(Input)({
  maxWidth: '95%',
  marginRight: '10px !important',
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
        allowedContests: record.allowedContests,
      });
    }
    return () => form.resetFields();
  }, [form, record]);

  const planSnap = useSnapshot(SubscriptionPlanState);
  return (
    <>
      {planSnap.mutationLoading && (
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
        name={`${record} ? update-plan : create-plan`}
        style={{
          opacity: planSnap.mutationLoading ? '0.15' : 1,
        }}
      >
        <Form.Item
          name="title"
          label="عنوان الخطة"
          rules={[{ required: true, message: 'يرجى كتابة عنوان الخطة' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="subTitle" label="الوصف">
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="السعر"
          rules={[{ required: true, message: 'يرجى كتابة سعر الخطة' }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value: string) => value?.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="allowedContests"
          label="عدد المسابقات المسموح بإنشائها"
          rules={[{ required: true, message: 'يرجى كتابة عدد أكبر من الصفر' }]}
        >
          <InputNumber />
        </Form.Item>

        <h4>صلاحيات الخطة</h4>
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
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: 'calc(50% - 10px)' }}
                  icon={<PlusOutlined />}
                >
                  أضف خيارات الخطة
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
