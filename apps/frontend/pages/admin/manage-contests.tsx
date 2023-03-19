import { Tabs } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import styled from '@emotion/styled';
import { TableBtn } from './dashboard';
import { getTitleMeta } from '@/utils/app';
import AdminLayout from '@/layout/AdminLayout';
import { PlusOutlined } from '@ant-design/icons';
import { PermissionTitle } from '@/graphql/graphql';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import CreateContest from '@/components/admin/contests/CreateContest';
import { useSearchContests } from '@/hooks/admin/manage-contests.hook';
import StudentsAnswers from '@/components/profile/teacher/contest/StudentsAnswers';
import ManageContestsTable from '@/components/admin/contests/ManageContestsTable';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const ManageContests = () => {
  const { methods, data, loading, filteredInfo, sortedInfo } =
    useSearchContests();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const tabs = [
    {
      label: 'إدارة المسابقات',
      key: '1',
      children: (
        <ManageContestsTable
          data={data}
          filteredInfo={filteredInfo}
          loading={loading}
          methods={methods}
          sortedInfo={sortedInfo}
        />
      ),
    },
    {
      label: 'نتائج مسابقات الطلاب',
      key: '2',
      children: <StudentsAnswers />,
    },
  ];

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'المسابقات')}</title>
      </Head>

      <StyledSection>
        <TableBtn
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={showDrawer}
        >
          مسابقة جديدة
        </TableBtn>
        <TableBtn onClick={methods.clearAllFilters}>إعادة الضبط</TableBtn>

        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          items={tabs}
          style={{ position: 'absolute', width: '100%' }}
        />
        <CreateContest
          visible={visible}
          onClose={onClose}
          onSuccess={() => methods.refetch()}
        />
      </StyledSection>
    </>
  );
};

ManageContests.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageContests, [PermissionTitle.AccessDashboard]);
