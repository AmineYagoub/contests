import { Button, Card, Col, Progress, Row, Statistic } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import LatestTeachers from '@/components/admin/dashboard/LatestTeachers';
import LatestStudents from '@/components/admin/dashboard/LatestStudents';
import StudentAgeChart from '@/components/admin/dashboard/StudentAgeChart';
import AdminLayout from '@/layout/AdminLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle, useDashboardQuery } from '@/graphql/graphql';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

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
});

const ContestsChart = dynamic(
  () => import('@/components/admin/dashboard/ContestsChart'),
  { ssr: false }
);

const AdminDashboard: NextPageWithLayout = () => {
  const { data, loading } = useDashboardQuery();
  const getStudentsPercent = () => {
    if (data) {
      const { studentTeacher, students } = data.dashboard;
      const total = studentTeacher + students;
      return {
        students: Math.round((students / total) * 100),
        studentTeacher: Math.round((studentTeacher / total) * 100),
      };
    }
  };
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
              value={data?.dashboard.teachers}
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
              value={data?.dashboard.studentTeacher}
              loading={loading}
              suffix="طالب"
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={getStudentsPercent()?.studentTeacher}
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
              value={data?.dashboard.students}
              loading={loading}
              prefix={
                <Progress
                  width={80}
                  strokeLinecap="butt"
                  type="dashboard"
                  percent={getStudentsPercent()?.students}
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
          <StudentAgeChart data={data?.dashboard.levels} loading={loading} />
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
