import { config } from '@/config/index';
import {
  CloudUploadOutlined,
  DeleteOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import { Button, List, Popconfirm, Space, Tooltip, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { FC, ReactElement } from 'react';

export type LoadingType = {
  letterImage: boolean;
  birthCertImage: boolean;
  personalImage: boolean;
};

type BaseProps = {
  name: string;
  onChange: (
    info: UploadChangeParam<UploadFile<unknown>>,
    name: string
  ) => void;
  id: string;
};
type DocumentUploderProps = BaseProps & {
  children: ReactElement;
};
type DocumentUpdaterProps = BaseProps & {
  url: string;
  loading: LoadingType;
  onDelete: (id: string, name: string) => void;
  confirmLoading: LoadingType;
};
type DocumentCardProps = DocumentUpdaterProps & {
  label?: string;
};

const Uploader: FC<DocumentUploderProps> = ({
  children,
  name,
  id,
  onChange,
}) => {
  return name === 'personalImage' ? (
    <ImgCrop rotate>
      <Upload
        name={name}
        action={config.upload.documentsUrl(id)}
        onChange={(info) => onChange(info, name)}
        showUploadList={false}
      >
        {children}
      </Upload>
    </ImgCrop>
  ) : (
    <Upload
      name={name}
      action={config.upload.documentsUrl(id)}
      onChange={(info) => onChange(info, name)}
      showUploadList={false}
    >
      {children}
    </Upload>
  );
};

const Updater: FC<DocumentUpdaterProps> = ({
  url,
  name,
  id,
  onChange,
  loading,
  onDelete,
  confirmLoading,
}) => (
  <List itemLayout="vertical" size="large">
    <List.Item
      extra={
        <Image width={250} height={250} alt={name} src={url} loading="lazy" />
      }
    >
      <List.Item.Meta />
      <Space>
        <Uploader name={name} id={id} onChange={(info) => onChange(info, name)}>
          <Tooltip title="تحديث">
            <Button
              shape="circle"
              icon={<FileSyncOutlined />}
              loading={loading[name]}
            />
          </Tooltip>
        </Uploader>
        <Popconfirm
          title="هل أنت متأكد من عملية الحذف؟"
          onConfirm={() => onDelete(id, name)}
          okButtonProps={{ loading: confirmLoading[name] }}
        >
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            loading={confirmLoading[name]}
          />
        </Popconfirm>
      </Space>
    </List.Item>
  </List>
);

const DocumentCard: FC<DocumentCardProps> = ({
  url,
  name,
  id,
  label,
  onChange,
  loading,
  onDelete,
  confirmLoading,
}) =>
  url ? (
    <Updater
      url={url}
      name={name}
      id={id}
      loading={loading}
      onDelete={onDelete}
      confirmLoading={confirmLoading}
      onChange={(info) => onChange(info, name)}
    />
  ) : (
    <Uploader name={name} id={id} onChange={(info) => onChange(info, name)}>
      <Button
        icon={<CloudUploadOutlined />}
        block
        type="primary"
        ghost
        loading={loading[name]}
      >
        {label}
      </Button>
    </Uploader>
  );

export default DocumentCard;
