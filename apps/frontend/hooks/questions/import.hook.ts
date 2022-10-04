import { UploadProps } from 'antd';

export const useImportQuestions = () => {
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
  };
  return {
    uploadProps,
  };
};
