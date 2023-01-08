import {
  Tag,
  Row,
  Col,
  Space,
  Image,
  Button,
  Drawer,
  Switch,
  Descriptions,
} from 'antd';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import MembershipData from './MembershipData';
import ViewUserSkeleton from '../ViewUserSkeleton';
import SendMessageToUser from '../SendMessageToUser';
import ViewTeacherStudents from './ViewTeacherStudents';
import { useUpdateUsers } from '@/hooks/admin/manage-users.hook';
import { MessageType, Teacher, useFindUserQuery } from '@/graphql/graphql';

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
              <SendMessageToUser id={user.id} type={MessageType.Message} />
              <SendMessageToUser id={user.id} type={MessageType.Alert} />
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
            <ViewTeacherStudents teacherId={profile.id} />
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default ViewTeacherProfile;
