import { withAuth } from '@/components/common/withAuth';
import MessageBox from '@/components/messages/MessageBox';
import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileMessages: NextPageWithLayout = () => {
  return <MessageBox />;
};
ProfileMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileMessages, [
  PermissionTitle.AccessStudentDashboard,
]);
