import ProfileLayout from '@/layout/ProfileLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import ProfileDetails from '../profile/details';

ProfileDetails.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default ProfileDetails;
