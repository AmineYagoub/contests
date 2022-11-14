import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Image,
  Popover,
  Row,
  Skeleton,
  Space,
  Switch,
  Tag,
} from 'antd';
import {
  RoleTitle,
  Student,
  StudentLevel,
  useFindUserQuery,
  User,
} from '@/graphql/graphql';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import {
  getMapperLabel,
  rolesMappedTypes,
  studentMappedLevels,
} from '@/utils/mapper';
import ViewStudentSkeleton from './ViewStudentSkeleton';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import StyledButton from '@/components/common/StyledButton';
import { useUpdateUsers } from '@/hooks/admin/manage-users.hook';
import { memo, useEffect, useState } from 'react';

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

  const { onUserStateChange, loading: l } = useUpdateUsers();

  return (
    <Drawer
      title="البيانات الشخصية للطالب"
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      style={{ position: 'absolute' }}
      bodyStyle={{ paddingBottom: 80 }}
      width={1200}
      destroyOnClose
      extra={
        <Button onClick={onClose} htmlType="reset" type="primary" ghost>
          إغلاق
        </Button>
      }
    >
      {loading || !profile ? (
        <ViewStudentSkeleton />
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
              <StyledButton
                icon={<MailOutlined />}
                type="primary"
                size="middle"
                shape="round"
              >
                أرسل رسالة
              </StyledButton>
              <StyledButton
                icon={<WarningOutlined />}
                type="primary"
                ghost
                size="middle"
                danger
                color="danger"
                shape="round"
              >
                أرسل تنبيه
              </StyledButton>
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
                {getMapperLabel<StudentLevel>(
                  studentMappedLevels,
                  profile.level
                )}
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
            <StyledDescriptions title={<h2>وثائق الطالب</h2>} layout="vertical">
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
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default ViewStudentProfile;
