import { Button } from 'antd';
import { useState } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import { PermissionTitle } from '@/graphql/graphql';
import { withAuth } from '@/components/common/withAuth';
import SendMessages from '@/components/messages/SendMessages';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import NotificationList from '@/components/messages/NotificationList';
import { useNotificationHook } from '@/hooks/messages/notification.hook';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const ManageNotifications = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { onLoadMore, refetch, data, loading, hasMore } = useNotificationHook();

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'الإشعارات')}</title>
      </Head>

      <section style={{ minHeight: '80vh' }}>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ float: 'left', zIndex: 10 }}
        >
          أرسل رسالة
        </Button>
        <NotificationList
          onLoadMore={onLoadMore}
          loading={loading}
          hasMore={hasMore}
          onSuccess={() => refetch()}
          data={data}
        />

        <SendMessages
          onClose={onClose}
          visible={visible}
          onSuccess={() => refetch()}
        />
      </section>
    </>
  );
};

ManageNotifications.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);

export default withAuth(ManageNotifications, [PermissionTitle.AccessDashboard]);
