import { Button, message, Modal, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import { FolderAddOutlined, InboxOutlined } from '@ant-design/icons';
import JSZip from 'jszip';
import * as fs from 'fs';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  beforeUpload(file, FileList) {
    JSZip.loadAsync(file) // 1) read the Blob
      .then((zip) => {
        const set = new Set();
        zip.forEach(function (relativePath, zipEntry) {
          const entry = relativePath.match(/[0-9]+/g)?.shift();
          if (entry && !zipEntry.dir) {
            fs.readFile(relativePath, (err, data) => {
              console.log(data);
            });
            return;
          }
        });
        console.log(set);
      });
  },
  onChange(info) {
    // console.log(info.file.fileName);
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // console.log("done");
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ImportQuestions = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
        <Dragger {...props}>
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
