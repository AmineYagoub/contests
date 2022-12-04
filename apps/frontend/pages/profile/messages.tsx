import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileMessages: NextPageWithLayout = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
      زر لمراسلة الادرة---زر لمراسلة المعلم المشرف
    </div>
  );
};
ProfileMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileMessages, [
  PermissionTitle.AccessStudentDashboard,
]);
