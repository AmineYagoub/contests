import { Alert, Button, Drawer, Space } from 'antd';
import { useState } from 'react';

import { Question } from '@/graphql/graphql';
import { useCreateQuestions } from '@/hooks/questions/create-question.hook';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';

const UpdateQuestion = ({
  onSuccess,
  record,
}: {
  onSuccess: () => void;
  record: Question;
}) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { onFinish, loadingUpdate, form, errorUpdate } = useCreateQuestions({
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
        title="تعديل سؤال"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
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
              loading={loadingUpdate}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <QuestionForm form={form} record={record} />
        {errorUpdate && (
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
    </>
  );
};

export default UpdateQuestion;
