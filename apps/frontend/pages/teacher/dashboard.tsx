import { useSnapshot } from 'valtio';

import { PermissionTitle, Teacher, User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import { Col, Progress, Row, Statistic, Tooltip } from 'antd';
import { StyledCard } from '../admin/dashboard';
import Image from 'next/image';
import { SketchCircleFilled } from '@ant-design/icons';
import TeacherStudentsList from '@/components/profile/teacher/TeacherStudentsList';

const ProfileDashboard: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;
  const profile = user.profile as Teacher;
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="عدد المسابقات الخاصة بي"
              precision={0}
              suffix="مسابقة"
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
              suffix="طالب"
              prefix={
                <Tooltip title="بالنسبة للعدد الإجمالي للطلبة">
                  <Progress
                    width={80}
                    strokeLinecap="butt"
                    type="dashboard"
                    percent={25}
                  />
                </Tooltip>
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
