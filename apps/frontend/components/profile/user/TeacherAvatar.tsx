import { LoadingOutlined } from '@ant-design/icons';
import { Image, message, notification, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

import { config } from '@/config/index';
import { useUploadDocuments } from '@/hooks/profile/document.hook';
import { User } from '@/graphql/graphql';
import ImgCrop from 'antd-img-crop';

const { uploadAllowedMimeType, documentsUrl, uploadMaxSize } = config.upload;

const UPLOAD_FIELD_NAME = 'personalImage';

const bytes = uploadMaxSize * 1024 * 1024;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('يمكنك فقط رفع صور بصيغة JPG/PNG !');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('حجم الصورة لا ينبغي أن يتجاوز 2MB !');
  }
  return isJpgOrPng && isLt2M;
};
const beforeCrop = (
  file: File,
  fileList: File[]
): boolean | Promise<boolean> => {
  const { type, name, size } = file;
  if (size > bytes) {
    notification.error({
      message: `تجاوز الحجم المسموح`,
      description: `صورتك الشخصية يجب أن لا يتعدى حجمها (${uploadMaxSize}MB) `,
    });
    return false;
  }
  if (!uploadAllowedMimeType.includes(type)) {
    notification.error({
      message: `إمتداد غير مسموح`,
      description: `إمتداد الملف ${name} غير مسموح به.`,
    });
    return false;
  }
  return true;
};

const TeacherAvatar = ({ user }: { user: User }) => {
  const { onUploadChange, docsList, loading } = useUploadDocuments(user);

  const uploadInProgress = (
    <div>
      <LoadingOutlined />
      <div style={{ marginTop: 8 }}>جاري رفع الصورة ...</div>
    </div>
  );
  return (
    <ImgCrop rotate modalTitle="ضبط الصورة الشخصية" beforeCrop={beforeCrop}>
      <Upload
        name={UPLOAD_FIELD_NAME}
        accept={uploadAllowedMimeType.join()}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        action={documentsUrl(user.id)}
        onChange={(info) => onUploadChange(info, UPLOAD_FIELD_NAME)}
      >
        {loading[UPLOAD_FIELD_NAME] ? (
          uploadInProgress
        ) : (
          <Image
            src={docsList?.personalImage.url}
            alt="avatar"
            className="avatar-uploader"
            preview={false}
          />
        )}
      </Upload>
    </ImgCrop>
  );
};

export default TeacherAvatar;
