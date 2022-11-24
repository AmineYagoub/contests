import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileMessages: NextPageWithLayout = () => {
  return (
    <div>
      <h1>قريبا ...</h1>
    </div>
  );
};
ProfileMessages.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);
export default ProfileMessages;
