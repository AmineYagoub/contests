import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle, RoleTitle } from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import MessageBox from '@/components/messages/MessageBox';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const TeacherMessages: NextPageWithLayout = () => {
  const userSnap = useSnapshot(AuthState).user;
  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'الرسائل')}</title>
      </Head>
      <MessageBox
        role={RoleTitle.Teacher}
        id={userSnap.id}
        profile={userSnap.profile.id}
        avatar={userSnap.profile.personalImage}
      />
    </>
  );
};
TeacherMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);

export default withAuth(TeacherMessages, [
  PermissionTitle.AccessTeacherDashboard,
]);
