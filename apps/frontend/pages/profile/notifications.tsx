import { withAuth } from '@/components/common/withAuth';
import NotificationList from '@/components/profile/common/NotificationList';
import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useSnapshot } from 'valtio';

const ProfileNotifications: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user;
  return <NotificationList id={user.id} />;
};
ProfileNotifications.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileNotifications, [
  PermissionTitle.AccessStudentDashboard,
]);
