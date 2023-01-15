import { useSnapshot } from 'valtio';

import {
  PermissionTitle,
  Teacher,
  User,
  useTeacherDashboardQuery,
} from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import { Col, Row, Statistic } from 'antd';
import { StyledCard } from '../admin/dashboard';
import Image from 'next/image';
import { SketchCircleFilled } from '@ant-design/icons';
import TeacherStudentsList from '@/components/profile/teacher/TeacherStudentsList';
import { UsersState } from '@/valtio/user.state';

const ProfileDashboard: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;
  const profile = user.profile as Teacher;
  const teacherSnap = useSnapshot(UsersState);
  const { data, loading } = useTeacherDashboardQuery({
    variables: {
      id: user?.id,
    },
  });
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="عدد المسابقات الخاصة بي"
              precision={0}
              suffix="مسابقة"
              value={data?.teacherDashboard.meTotal}
              loading={loading}
              prefix={
                <Image
                  src="/icons/dashboard/reward.png"
                  width="60"
                  height="60"
                  alt="money"
                />
              }
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="عدد المسابقات الإدارية"
              precision={0}
              suffix="مسابقة"
              value={data?.teacherDashboard.total}
              loading={loading}
              prefix={
                <Image
                  src="/icons/dashboard/reward.png"
                  width="60"
                  height="60"
                  alt="money"
                />
              }
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="الطلاب المشرف عليهم"
              precision={0}
              value={teacherSnap.totalUsers}
              suffix="طالب"
              prefix={
                <Image
                  src="/icons/dashboard/students.png"
                  width="65"
                  height="65"
                  alt="money"
                />
              }
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="حالة إشتراكي"
              precision={55555}
              valueRender={(val) => <span></span>}
              suffix={profile.subscription?.memberShipOn.title || 'المجاني'}
              prefix={
                <SketchCircleFilled
                  style={{ fontSize: '5rem', color: 'gold' }}
                />
              }
            />
          </StyledCard>
        </Col>
      </Row>
      <Row align="top" gutter={2} style={{ margin: '2em 0' }}>
        <TeacherStudentsList teacherId={profile.id} />
      </Row>
    </>
  );
};
ProfileDashboard.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileDashboard, [
  PermissionTitle.AccessTeacherDashboard,
]);
