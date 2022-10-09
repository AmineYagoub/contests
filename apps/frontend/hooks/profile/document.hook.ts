import { useState } from 'react';
import {
  Student,
  User,
  useUpdateStudentDocumentsMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { config } from '@/config/index';
import { LoadingType } from '@/components/profile/user/DocumentCard';

type DocumentProps = {
  url: string;
  id: string;
};

type DocumentsList = {
  personalImage: DocumentProps;
  birthCertImage: DocumentProps;
  letterImage: DocumentProps;
};

export const useUploadDocuments = (user: User) => {
  const profile = user.profile as Student;
  const [docsList, setDocsList] = useState<DocumentsList>({
    letterImage: { id: user.id, url: profile.letterImage },
    birthCertImage: { id: user.id, url: profile.birthCertImage },
    personalImage: { id: user.id, url: profile.personalImage },
  });
  const [loading, setLoading] = useState<LoadingType>({
    letterImage: false,
    birthCertImage: false,
    personalImage: false,
  });
  const [confirmLoading, setConfirmLoading] = useState<LoadingType>({
    letterImage: false,
    birthCertImage: false,
    personalImage: false,
  });
  const [UpdateStudentDocumentsMutation] = useUpdateStudentDocumentsMutation();

  const onUploadChange = async ({ fileList: newFileList }, name: string) => {
    setLoading({
      ...loading,
      [name]: true,
    });

    if (newFileList[0]?.response) {
      const res = newFileList[0]?.response;
      setDocsList({
        ...docsList,
        [res.docName]: {
          url: res.message,
          id: user.id,
        },
      });
      try {
        await UpdateStudentDocumentsMutation({
          variables: {
            id: user.id,
            input: {
              [res.docName]: res.message,
            },
          },
        });
      } catch (error) {
        Logger.log(error);
      } finally {
        setLoading({
          ...loading,
          [name]: false,
        });
      }
    }
  };

  const onDelete = async (id: string, name: string) => {
    setConfirmLoading({
      ...confirmLoading,
      [name]: true,
    });
    try {
      const res = await fetch(config.upload.deleteDocumentsUrl(id, name), {
        method: 'DELETE',
      }).then((res) => res.json());

      if (res.status === 'ok') {
        await UpdateStudentDocumentsMutation({
          variables: {
            id: id,
            input: {
              [name]: '',
            },
          },
        });
        setDocsList({
          ...docsList,
          [name]: {
            url: '',
            id: id,
          },
        });
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      setConfirmLoading({
        ...confirmLoading,
        [name]: false,
      });
    }
  };

  return {
    onUploadChange,
    docsList,
    loading,
    onDelete,
    confirmLoading,
  };
};
