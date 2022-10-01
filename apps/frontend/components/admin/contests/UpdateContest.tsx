import { Alert, Button, Drawer, Space } from 'antd';
import { useState } from 'react';

import { Contest } from '@/graphql/graphql';
import { useCreateContests } from '@/hooks/contests/create.hook';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

import ContestForm from './ContestForm';

const UpdateContest = ({
  onSuccess,
  record,
}: {
  onSuccess: () => void;
  record: Contest;
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { onFinish, loadingUpdate, errorUpdate, form } = useCreateContests({
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
              loading={loadingUpdate}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <ContestForm form={form} record={record} />
        {errorUpdate && (
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
