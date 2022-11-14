import { Space, Table, Typography } from 'antd';
import moment from 'moment-timezone';
import { useState } from 'react';
import { SubscriptionPlan } from '@/graphql/graphql';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import CreatePlan from '../plans/CreatePlan';
import DeletePlan from '../plans/DeletePlan';
import UpdatePlan from '../plans/UpdatePlan';
import { TableBtn } from '@/pages/admin/dashboard';
import { useFindPlans } from '@/hooks/admin/manage-plans.hook';
const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 200px)',
});

const { Text } = Typography;

const ManageSubscriptionPlans = () => {
  const { refetch, loading, data } = useFindPlans();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const columns: ColumnsType<ColumnType<SubscriptionPlan>> = [
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'الوصف',
      dataIndex: 'subTitle',
      key: 'subTitle',
    },

    {
      title: 'السعر',
      key: 'price',
      dataIndex: 'price',
      render: (price) => (
        <Text strong type='success'>{`${Number(price / 100).toFixed(
          2
        )} $`}</Text>
      ),
    },
    {
      title: 'عدد المسابقات',
      dataIndex: 'allowedContests',
      key: 'allowedContests',
    },
    {
      title: 'عدد الصلاحيات',
      dataIndex: 'options',
      key: 'options',
      render: (options) => options?.length,
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'created',
      key: 'created',
      render: (date: string | number | Date) => (
        <span>{moment(date).calendar()}</span>
      ),
    },
    {
      title: 'آخر تحديث',
      dataIndex: 'updated',
      key: 'updated',
      render: (date: string | number | Date) => (
        <span>{moment(date).calendar()}</span>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'action',
      filteredValue: null,
      render: (record) => (
        <Space size='small'>
          <DeletePlan record={record} onSuccess={() => refetch()} />
          <UpdatePlan record={record} onSuccess={() => refetch()} />
        </Space>
      ),
    },
  ];

  return (
    <StyledSection>
      <TableBtn
        type='primary'
        size='middle'
        icon={<PlusOutlined />}
        onClick={showDrawer}
      >
        خطة جديدة
      </TableBtn>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        size='large'
      />
      <CreatePlan
        visible={visible}
        onClose={onClose}
        onSuccess={() => refetch()}
      />
    </StyledSection>
  );
};

export default ManageSubscriptionPlans;
