import { AuthState } from '@/valtio/auth.state';
import { UploadProps } from 'antd';
import { useSnapshot } from 'valtio';

export const useImportQuestions = () => {
  const id = useSnapshot(AuthState).user?.id;
  const uploadProps: UploadProps = {
    name: 'file',
    action: `/api/upload?authorId=${id}`,
  };
  return {
    uploadProps,
  };
};
