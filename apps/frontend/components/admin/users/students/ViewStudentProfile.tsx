import {
  Tag,
  Col,
  Row,
  Card,
  Image,
  Space,
  Drawer,
  Avatar,
  Button,
  Switch,
  Popover,
  Skeleton,
  Descriptions,
} from 'antd';
import {
  User,
  Student,
  RoleTitle,
  MessageType,
  StudentLevel,
  useFindUserQuery,
} from '@/graphql/graphql';
import {
  getLevelsLabel,
  getMapperLabel,
  rolesMappedTypes,
  studentMappedLevels,
} from '@/utils/mapper';
import styled from '@emotion/styled';
import moment from 'moment-timezone';
import { memo, useEffect, useState } from 'react';
import ViewUserSkeleton from '../ViewUserSkeleton';
import SendMessageToUser from '../SendMessageToUser';
import { useUpdateUsers } from '@/hooks/admin/manage-users.hook';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';

const StyledDescriptions = styled(Descriptions)({
  table: {
    minHeight: '180px !important',
    boxShadow: 'unset !important',
  },
});

const UserRole = memo<{ user: User }>(function UserRole({ user }) {
  const role = getMapperLabel(rolesMappedTypes, user.role.title);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (open) {
      t = setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    return () => {
      clearTimeout(t);
    };
  }, [open]);
  if (user.role.title === RoleTitle.StudentTeacher) {
    const teacher = (user.profile as Student).teacher;
    return (
      <Popover
        content={
          <Card style={{ width: 300, maxHeight: 150 }}>
            <Skeleton loading={loading} avatar active>
              <Card.Meta
                avatar={<Avatar src={teacher?.personalImage} />}
                title={`${teacher?.firstName} ${teacher?.lastName}`}
                description={teacher.country}
              />
            </Skeleton>
          </Card>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        style={{ width: 300, maxHeight: 150 }}
      >
        <Button type="link" style={{ height: 'unset', padding: 'unset' }}>
          {role}
        </Button>
      </Popover>
    );
  }
  return <span>{role}</span>;
});

const ViewStudentProfile = ({
  profileKey,
  visible,
  onClose,
}: {
  profileKey: number;
  visible: boolean;
  onClose: () => void;
}) => {
  const { data, loading } = useFindUserQuery({
    variables: { key: profileKey },
    skip: !visible,
  });
  const user = data?.findUser;
  const profile = user?.profile as Student;
  const userSnap = useSnapshot(AuthState);
  const isAdmin = userSnap?.user?.role.title === RoleTitle.Admin;

  const { onUserStateChange, loading: l } = useUpdateUsers();

  return (
    <Drawer
      title="البيانات الشخصية للطالب"
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      width={1200}
      extra={
        <Button onClick={onClose} htmlType="reset" type="primary" ghost>
          إغلاق
        </Button>
      }
    >
      {loading || !profile ? (
        <ViewUserSkeleton />
      ) : (
        <Row justify="space-between">
          <Col
            span={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image
              src={profile.personalImage}
              alt="avatar"
              width={200}
              height={200}
            />
            <Space
              style={{
                margin: '20px auto',
                display: 'flex',
                justifyContent: 'center',
              }}
              align="center"
            >
              <SendMessageToUser id={user.id} type={MessageType.Message} />
              <SendMessageToUser id={user.id} type={MessageType.Alert} />
            </Space>
          </Col>
          <Col span={17}>
            <StyledDescriptions title={<h2>بيانات الطالب</h2>}>
              <Descriptions.Item label="الإسم الكامل">
                {`${profile.firstName} ${profile.lastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الميلاد">
                {moment(String(profile.dateOfBirth)).calendar()}
              </Descriptions.Item>
              <Descriptions.Item label="البلد">
                {profile.country}
              </Descriptions.Item>
              {/* ------------------------------------ */}
              <Descriptions.Item label="البريد الإلكتروني">
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ التسجيل">
                {moment(user.created).fromNow()}
              </Descriptions.Item>
              <Descriptions.Item label="تفعيل البريد الإلكتروني">
                <Tag color={user.emailConfirmed ? 'green' : 'red'}>
                  {user.emailConfirmed ? 'مفعل' : 'غير مفعل'}
                </Tag>
              </Descriptions.Item>
              {/* ------------------------------------ */}
              <Descriptions.Item label="مستوى الطالب">
                <Tag color="blue">
                  {getLevelsLabel<StudentLevel>(
                    studentMappedLevels,
                    profile.level
                  )}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="نوع العضوية">
                <UserRole user={user as User} />
              </Descriptions.Item>
              <Descriptions.Item label="حالة العضوية">
                <Switch
                  checkedChildren="نشط"
                  unCheckedChildren="غير نشط"
                  defaultChecked={user.isActive}
                  onChange={(value) => onUserStateChange(value, user.id)}
                  loading={l}
                />
              </Descriptions.Item>
            </StyledDescriptions>
            {isAdmin && (
              <StyledDescriptions
                title={<h2>وثائق الطالب</h2>}
                layout="vertical"
              >
                <Descriptions.Item label="إثبات الهوية">
                  {profile.birthCertImage ? (
                    <Image
                      src={profile.birthCertImage}
                      alt="birthCertImage"
                      width={64}
                      height={64}
                    />
                  ) : (
                    'غير متوفر'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="خطاب المدرسة">
                  {profile.letterImage ? (
                    <Image
                      src={profile.letterImage}
                      alt="letterImage"
                      width={64}
                      height={64}
                    />
                  ) : (
                    'غير متوفر'
                  )}
                </Descriptions.Item>
              </StyledDescriptions>
            )}
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default ViewStudentProfile;
