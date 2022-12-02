import { useSnapshot } from 'valtio';

import { PermissionTitle, User } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';

const TeacherMessages: NextPageWithLayout = () => {
  /// const user = useSnapshot(AuthState).user as User;
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};
TeacherMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default withAuth(TeacherMessages, [
  PermissionTitle.AccessTeacherDashboard,
]);
