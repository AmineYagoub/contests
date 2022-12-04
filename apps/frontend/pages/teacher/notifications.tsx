import { useSnapshot } from 'valtio';

import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import NotificationList from '@/components/profile/common/NotificationList';

const TeacherNotifications: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user;
  return <NotificationList id={user.profile.id} />;
};
TeacherNotifications.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(TeacherNotifications, [
  PermissionTitle.AccessTeacherDashboard,
]);
