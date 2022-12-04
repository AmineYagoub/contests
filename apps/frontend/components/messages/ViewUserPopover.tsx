import { RoleTitle, Student, Teacher } from '@/graphql/graphql';
import { getMapperLabel, studentMappedLevels } from '@/utils/mapper';
import { Avatar, Button, Card, Popover, Skeleton } from 'antd';
import moment from 'moment-timezone';
import { memo, useEffect, useState } from 'react';

const ViewUserPopover = memo<{ profile: Student | Teacher; role?: RoleTitle }>(
  function UserRole({ profile, role }) {
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
                avatar={<Avatar src={profile?.personalImage} />}
                title={`${profile?.firstName} ${profile?.lastName}`}
                description={
                  <ul>
                    <li>
                      <b>البلد: </b> {profile.country}
                    </li>
                    {(profile as Student)?.level && (
                      <li>
                        <b>المستوى: </b>
                        {getMapperLabel(
                          studentMappedLevels,
                          (profile as Student).level
                        )}
                      </li>
                    )}
                    {role && (
                      <li>
                        <b>العضوية: </b>
                        {role === RoleTitle.GoldenTeacher
                          ? 'معلم ذهبي'
                          : 'معلم'}
                      </li>
                    )}
                    <li>
                      <b>تاريخ التسجيل: </b>
                      {moment(profile.created).calendar()}
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
          {`${profile?.firstName} ${profile?.lastName}`}
        </Button>
      </Popover>
    );
  }
);

export default ViewUserPopover;
