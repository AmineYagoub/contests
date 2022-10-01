import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ProfileDashboard: NextPageWithLayout = () => {
  return <div>ProfileDashboard</div>;
};
ProfileDashboard.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout>{page}</ProfileLayout>
);
export default ProfileDashboard;
