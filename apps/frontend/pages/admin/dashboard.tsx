import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button, Card, Col, Progress, Row, Statistic } from 'antd';

import LatestTeachers from '@/components/admin/dashboard/LatestTeachers';
import LatestStudents from '@/components/admin/dashboard/LatestStudents';
import StudentAgeChart from '@/components/admin/dashboard/StudentAgeChart';
import AdminLayout from '@/layout/AdminLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';
import { useAdminDashboard } from '@/hooks/admin/dashboard.hook';

export const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f8f8f8 !important',
  height: 150,
  padding: 35,
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
});

export const TableBtn = styled(Button)({
  float: 'right',
  marginBottom: 15,
  marginRight: 5,
  zIndex: 10,
});

const ContestsChart = dynamic(
  () => import('@/components/admin/dashboard/ContestsChart'),
  { ssr: false }
);

const AdminDashboard: NextPageWithLayout = () => {
  const {
    contestsCount,
    teachersCount,
    studentTeacherPercent,
    studentsLevels,
    studentsPercent,
    studentTeacherCount,
    studentsCount,
    loading,
  } = useAdminDashboard();

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم')}</title>
      </Head>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard bordered={false}>
            <Statistic
              title="عدد المسابقات"
              value={contestsCount}
              loading={loading}
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
              value={teachersCount}
              loading={loading}
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
              value={studentTeacherCount}
              loading={loading}
              suffix="طالب"
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={studentTeacherPercent}
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
              value={studentsCount}
              loading={loading}
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={studentsPercent}
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
          <StudentAgeChart data={studentsLevels} loading={loading} />
        </Col>
      </Row>
      <Row align="top" gutter={12}>
        <Col span={14}>
          <LatestStudents />
        </Col>
        <Col span={10}>
          <LatestTeachers />
        </Col>
      </Row>
    </>
  );
};

AdminDashboard.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(AdminDashboard, [PermissionTitle.AccessDashboard]);
