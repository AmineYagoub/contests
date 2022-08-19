import { Button, Modal, Progress, Upload } from 'antd';
import { useState } from 'react';

import { useCreateQuestions } from '@/hooks/questions/create-question.hook';
import { FolderAddOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ImportQuestions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { uploadProps, progress } = useCreateQuestions({});

  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        ghost
        icon={<FolderAddOutlined />}
        onClick={showModal}
      >
        إستيراد الأسئلة
      </Button>
      <Modal
        title="20px to Top"
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={progress}
        />
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            إسحب و أفلت ملف الأسئلة بصيغة (zip.)
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default ImportQuestions;
