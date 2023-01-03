import { NextPageWithLayout } from '@/utils/types';
import ProfileLayout from '@/layout/ProfileLayout';
import { PermissionTitle } from '@/graphql/graphql';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import NotificationList from '@/components/messages/NotificationList';
import { useNotificationHook } from '@/hooks/messages/notification.hook';

const ProfileNotifications: NextPageWithLayout = () => {
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
ProfileNotifications.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileNotifications, [
  PermissionTitle.AccessStudentDashboard,
]);
