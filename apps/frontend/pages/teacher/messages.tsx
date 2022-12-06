import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import MessageBox from '@/components/messages/MessageBox';

const TeacherMessages: NextPageWithLayout = () => {
  return <MessageBox />;
};
TeacherMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);

export default withAuth(TeacherMessages, [
  PermissionTitle.AccessTeacherDashboard,
]);
