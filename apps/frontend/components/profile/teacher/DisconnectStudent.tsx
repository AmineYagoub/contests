import { Button, Popconfirm, Tooltip } from 'antd';

import { useConnectStudentToTeacherMutation } from '@/graphql/graphql';
import { DisconnectOutlined } from '@ant-design/icons';
import { Logger } from '@/utils/app';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';

const DisconnectStudent = ({
  studentId,

  onSuccess,
}: {
  studentId: string;

  onSuccess: () => void;
}) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const showTooltip = () => {
    setOpenTooltip(true);
  };

  const hideTooltip = () => {
    setOpenTooltip(false);
  };

  const [ConnectStudentToTeacherMutation, { loading }] =
    useConnectStudentToTeacherMutation();

  const user = useSnapshot(AuthState).user;

  const confirmDisconnect = async () => {
    try {
      const res = await ConnectStudentToTeacherMutation({
        variables: {
          connect: false,
          studentId,
          id: user?.id,
        },
      });
      if (res) {
        onSuccess();
      }
    } catch (error) {
      Logger.log(error);
    }
  };

  return (
    <Popconfirm
      title="هل أنت متأكد من إزالة هذا الطالب من تحت إشرافك ؟"
      onConfirm={confirmDisconnect}
    >
      <Tooltip
        title="إزالة هذا الطالب من تحت إشرافك"
        color="lime"
        open={openTooltip}
      >
        <Button
          shape="circle"
          icon={<DisconnectOutlined style={{ color: 'orange' }} />}
          loading={loading}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={hideTooltip}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DisconnectStudent;
