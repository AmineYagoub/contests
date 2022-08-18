import { Alert, Button, Drawer, Form, Space, Tooltip } from 'antd';

import { useState } from 'react';

import { Contest, useUpdateContestMutation } from '@/graphql/graphql';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';

import ContestForm from './ContestForm';

const UpdateContest = ({
  onSuccess,
  record,
}: {
  onSuccess: () => void;
  record: Contest;
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [UpdateContestMutation, { loading, error }] =
    useUpdateContestMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const data = await UpdateContestMutation({
        variables: {
          input: values,
          id: Number(record.id),
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
    <>
      <Tooltip title="تحرير السؤال">
        <Button
          shape="circle"
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={showDrawer}
        />
      </Tooltip>

      <Drawer
        title="تحديث بيانات المسابقة"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={720}
        destroyOnClose
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
              form="update-contest"
              loading={loading}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <ContestForm form={form} record={record} />
        {error && (
          <Alert
            message="خطأ"
            description="حدث خطأ أثناء حفظ المسابقة ، يرجى المحاولة مرة أخرى"
            banner
            closable
            type="error"
            showIcon
          />
        )}
      </Drawer>
    </>
  );
};

export default UpdateContest;
