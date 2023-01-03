import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import NotificationList from '@/components/messages/NotificationList';
import { useNotificationHook } from '@/hooks/messages/notification.hook';

const TeacherNotifications: NextPageWithLayout = () => {
  const { onLoadMore, refetch, data, loading, hasMore } = useNotificationHook();
  return (
    <NotificationList
      onLoadMore={onLoadMore}
      loading={loading}
      hasMore={hasMore}
      onSuccess={() => refetch()}
      data={data}
    />
  );
};
TeacherNotifications.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(TeacherNotifications, [
  PermissionTitle.AccessTeacherDashboard,
]);
