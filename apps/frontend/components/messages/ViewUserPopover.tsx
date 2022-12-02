import { Student } from '@/graphql/graphql';
import { getMapperLabel, studentMappedLevels } from '@/utils/mapper';
import { Avatar, Button, Card, Popover, Skeleton } from 'antd';
import moment from 'moment-timezone';
import { memo, useEffect, useState } from 'react';

const ViewUserPopover = memo<{ user: Student }>(function UserRole({ user }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (open) {
      t = setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    return () => {
      clearTimeout(t);
    };
  }, [open]);

  return (
    <Popover
      content={
        <Card style={{ width: 500, maxHeight: 250 }}>
          <Skeleton loading={loading} avatar active>
            <Card.Meta
              avatar={<Avatar src={user?.personalImage} />}
              title={`${user?.firstName} ${user?.lastName}`}
              description={
                <ul>
                  <li>
                    <b>تاريخ التسجيل: </b> {moment(user.created).calendar()}
                  </li>
                  <li>
                    <b>البلد: </b> {user.country}
                  </li>
                  <li>
                    <b>المستوى: </b>{' '}
                    {getMapperLabel(studentMappedLevels, user.level)}
                  </li>
                </ul>
              }
            />
          </Skeleton>
        </Card>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="link" style={{ height: 'unset', padding: 'unset' }}>
        {`${user?.firstName} ${user?.lastName}`}
      </Button>
    </Popover>
  );
});

export default ViewUserPopover;
