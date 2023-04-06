import { AuthState } from '@/valtio/auth.state';
import { UploadProps } from 'antd';
import { useSnapshot } from 'valtio';

export const useImportQuestions = (isDictation: boolean) => {
  const id = useSnapshot(AuthState).user?.id;
  const uploadProps: UploadProps = {
    name: 'file',
    action: isDictation
      ? `/api/questions/upload-dictation?authorId=${id}`
      : `/api/questions/upload?authorId=${id}`,
  };
  return {
    uploadProps,
  };
};
