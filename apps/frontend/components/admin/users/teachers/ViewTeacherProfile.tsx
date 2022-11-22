import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Image,
  Row,
  Space,
  Switch,
  Tag,
} from 'antd';
import { Teacher, useFindUserQuery } from '@/graphql/graphql';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import ViewUserSkeleton from '../ViewUserSkeleton';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import StyledButton from '@/components/common/StyledButton';
import { useUpdateUsers } from '@/hooks/admin/manage-users.hook';
import MembershipData from './MembershipData';
import ViewTeacherStudents from './ViewTeacherStudents';

const StyledDescriptions = styled(Descriptions)({
  table: {
    minHeight: '180px !important',
    boxShadow: 'unset !important',
  },
});

const ViewTeacherProfile = ({
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
  const profile = user?.profile as Teacher;
  const { onUserStateChange, loading: l } = useUpdateUsers();

  return (
    <Drawer
      title="الصفحة الشخصية للمعلم"
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      width={1080}
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
            <StyledDescriptions title={<h2>بيانات المعلم</h2>}>
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
              <Descriptions.Item label="رقم الهاتف">
                {profile.phone
                  ? `${profile.phone.phone} (${profile.phone.phoneCode})`
                  : 'غير متوفر'}
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
            <MembershipData
              title="الإشتراك في المنصة"
              membershipPrams={profile.subscription}
              profileId={profile.id}
            />
            <ViewTeacherStudents />
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default ViewTeacherProfile;
