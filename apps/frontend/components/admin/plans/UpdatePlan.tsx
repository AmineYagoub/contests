import { Alert, Button, Drawer, Space } from 'antd';
import { useState } from 'react';

import { SubscriptionPlan } from '@/graphql/graphql';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

import SubscriptionPlanForm from './SubscriptionPlanForm';
import { useCreateSubscriptionPlan } from '@/hooks/admin/manage-plans.hook';

const UpdatePlan = ({
  onSuccess,
  record,
}: {
  onSuccess: () => void;
  record: SubscriptionPlan;
}) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { onFinish, loadingUpdate, form, errorUpdate } =
    useCreateSubscriptionPlan({
      onSuccess,
      record,
      onClose,
    });
  return (
    <>
      <Button
        shape="circle"
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={showDrawer}
      />

      <Drawer
        title="تعديل الخطة"
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
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
              form="update-plan"
              loading={loadingUpdate}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <SubscriptionPlanForm form={form} record={record} />
        {errorUpdate && (
          <Alert
            message="خطأ"
            description="حدث خطأ أثناء عمليية الحفظ ، يرجى المحاولة مرة أخرى"
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

export default UpdatePlan;
