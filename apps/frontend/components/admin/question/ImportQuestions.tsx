import { Button, Modal, Progress, Upload } from 'antd';
import { useState } from 'react';

import { FolderAddOutlined, CloudSyncOutlined } from '@ant-design/icons';
import { useImportQuestions } from '@/hooks/questions/import-questions.hook';
import { useSnapshot } from 'valtio';
import { QuestionActions, QuestionState } from '@/valtio/question.state';
import styled from '@emotion/styled';

const { Dragger } = Upload;

const StyledSection = styled('section')({
  height: 150,
  padding: 5,
});

const ImportQuestions = ({ onSuccess }: { onSuccess: () => void }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { uploadProps } = useImportQuestions();
  const questionSnap = useSnapshot(QuestionState);

  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    QuestionActions.setImportProgress(0);
    onSuccess();
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
        title="إستيراد الأسئلة"
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        destroyOnClose
        confirmLoading={
          questionSnap.importProgress > 0 && questionSnap.importProgress <= 100
        }
        closable={false}
      >
        <Dragger
          {...uploadProps}
          disabled={questionSnap.importProgress > 0}
          showUploadList={false}
        >
          {questionSnap.importProgress === 0 ? (
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
                percent={questionSnap.importProgress}
              />
              <p>جاري إستيراد البيانات...</p>
            </StyledSection>
          )}
        </Dragger>
      </Modal>
    </>
  );
};

export default ImportQuestions;
