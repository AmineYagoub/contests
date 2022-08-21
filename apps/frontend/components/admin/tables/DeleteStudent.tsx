import { Button, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteStudent = ({ record }) => {
  const confirmDelete = async () => {
    console.error(record);
  };
  return (
    <Popconfirm
      title="سيتم حذف الطالب و جميع المدخلات المرتبطة به"
      onConfirm={confirmDelete}
    >
      <Tooltip title="أحذف الطالب" color="magenta">
        <Button
          shape="circle"
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          danger
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteStudent;
