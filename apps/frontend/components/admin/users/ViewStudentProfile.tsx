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
import { Student, StudentLevel, useFindStudentQuery } from '@/graphql/graphql';
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
import { useUpdateStudents } from '@/hooks/admin/manage-students.hook';

const StyledDescriptions = styled(Descriptions)({
  table: {
    minHeight: '180px !important',
    boxShadow: 'unset !important',
  },
});

const ViewStudentProfile = ({
  id,
  visible,
  onClose,
}: {
  id: string;
  visible: boolean;
  onClose: () => void;
}) => {
  const { data, loading } = useFindStudentQuery({
    variables: { id },
    skip: !visible,
  });
  const user = data?.findStudent;
  const profile = user?.profile as Student;

  const { onUserStateChange, loading: l } = useUpdateStudents();

  return (
    <Drawer
      title="البيانات الشخصية للطالب"
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      style={{ position: 'absolute' }}
      bodyStyle={{ paddingBottom: 80 }}
      width={1080}
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
                {getMapperLabel(rolesMappedTypes, user.role.title)}
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
                <Image
                  src={profile.birthCertImage}
                  alt="avatar"
                  width={64}
                  height={64}
                />
              </Descriptions.Item>
              <Descriptions.Item label="خطاب المدرسة">
                <Image
                  src={profile.letterImage}
                  alt="avatar"
                  width={64}
                  height={64}
                />
              </Descriptions.Item>
            </StyledDescriptions>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default ViewStudentProfile;
