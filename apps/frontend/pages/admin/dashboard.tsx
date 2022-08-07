import LatestContests from '@/components/admin/LatestContests';
import LatestInstructors from '@/components/admin/LatestInstructors';
import LatestUsers from '@/components/admin/LatestUsers';
import StudentAgeChart from '@/components/admin/StudentAgeChart';
import { NextPageWithLayout } from '@/config/types';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Card, Col, Progress, Row, Statistic } from 'antd';
import dynamic from 'next/dynamic';

import Image from 'next/image';

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f8f8f8 !important',
  height: 150,
  padding: 35,
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
});

const ContestsChart = dynamic(
  () => import('../../components/admin/ContestsChart'),
  { ssr: false }
);

const AdminDashboard: NextPageWithLayout = () => {
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
        <Col span={15}>
          <ContestsChart />
        </Col>
        <Col span={9}>
          <StudentAgeChart />
        </Col>
      </Row>
      <Row align="top" gutter={12}>
        <Col span={14}>
          <LatestUsers />
        </Col>
        <Col span={10}>
          <LatestInstructors />
        </Col>
      </Row>
    </>
  );
};

AdminDashboard.getLayout = (page: EmotionJSX.Element) => (
  <AdminDashboardLayout>{page}</AdminDashboardLayout>
);
export default AdminDashboard;
