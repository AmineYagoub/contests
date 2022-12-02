import { useSnapshot } from 'valtio';

import { PermissionTitle, User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import { Col, Progress, Row, Statistic } from 'antd';
import { StyledCard } from '../admin/dashboard';
import Image from 'next/image';

const ProfileDashboard: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="عدد المسابقات"
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
              title="عدد المعلمين"
              precision={0}
              suffix="معلم"
              prefix={
                <Image
                  src="/icons/dashboard/training.png"
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
              title="الطلاب المرتبطين بمشرفين"
              precision={0}
              suffix="طالب"
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={25}
                />
              }
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="الطلاب الغير مرتبطين بمشرفين"
              precision={0}
              suffix="طالب"
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={75}
                />
              }
            />
          </StyledCard>
        </Col>
      </Row>
      <Row align="top" gutter={2} style={{ margin: '1em 0' }}>
        <Col span={15}>hfhhf</Col>
        <Col span={9}>fff</Col>
      </Row>
      <Row align="top" gutter={12}>
        <Col span={14}>sss</Col>
        <Col span={10}>ss</Col>
      </Row>
    </>
  );
};
ProfileDashboard.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);
export default withAuth(ProfileDashboard, [
  PermissionTitle.AccessTeacherDashboard,
]);
