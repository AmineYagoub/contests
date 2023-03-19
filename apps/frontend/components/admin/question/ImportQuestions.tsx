import { Button, Modal, Progress, Upload } from 'antd';
import { useState } from 'react';

import { useImportQuestions } from '@/hooks/questions/import.hook';
import { socketVar } from '@/utils/app';
import { CloudSyncOutlined, FolderAddOutlined } from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';

const { Dragger } = Upload;

const StyledSection = styled('section')({
  height: 150,
  padding: 5,
});

const ImportQuestions = ({ onSuccess }: { onSuccess: () => void }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const { uploadProps } = useImportQuestions();
  const socket = useReactiveVar(socketVar);
  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setImportProgress(0);
    onSuccess();
  };

  socket.on('saveQuestionsProgress', (data: number) => {
    setImportProgress(data);
  });

  const loading = importProgress > 0 && importProgress < 100;

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
        title="إستيراد الأسئلة"
        style={{ top: 20 }}
        open={modalVisible}
        destroyOnClose
        confirmLoading={loading}
        closable={false}
        maskClosable
        transitionName=""
        maskTransitionName=""
        footer={
          <Button
            type="primary"
            onClick={closeModal}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'يرجى الإنتظار ...' : 'إنهاء'}
          </Button>
        }
      >
        <Dragger {...uploadProps} disabled={loading} showUploadList={false}>
          {importProgress === 0 ? (
            <StyledSection>
              <p className="ant-upload-drag-icon">
                <CloudSyncOutlined />
              </p>
              <p className="ant-upload-text">
                إسحب و أفلت ملف الأسئلة بصيغة (zip.)
              </p>
            </StyledSection>
          ) : (
            <StyledSection>
              <Progress
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={importProgress}
              />

              <p>
                {loading
                  ? 'يرجى الإنتظار جاري إستيراد الأسئلة...'
                  : 'تمت العملية بنجاح. يمكنك الضغط على زر إنهاء'}
              </p>
            </StyledSection>
          )}
        </Dragger>
      </Modal>
    </>
  );
};

export default ImportQuestions;
