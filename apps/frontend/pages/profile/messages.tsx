import { withAuth } from '@/components/common/withAuth';
import MessageBox from '@/components/messages/MessageBox';
import { PermissionTitle, RoleTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { getTitleMeta } from '@/utils/app';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Head from 'next/head';
import { useSnapshot } from 'valtio';

const ProfileMessages: NextPageWithLayout = () => {
  const userSnap = useSnapshot(AuthState).user;
  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'الرسائل')}</title>
      </Head>
      <MessageBox
        role={RoleTitle.Student}
        id={userSnap?.id}
        avatar={userSnap?.profile.personalImage}
      />
    </>
  );
};
ProfileMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default withAuth(ProfileMessages, [
  PermissionTitle.AccessStudentDashboard,
]);
