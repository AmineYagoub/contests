import AuthLayout from '@/layout/AuthLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const ForgotPassword = () => {
  return <div>ForgotPassword</div>;
};
ForgotPassword.getLayout = (page: EmotionJSX.Element) => (
  <AuthLayout>{page}</AuthLayout>
);
export default ForgotPassword;
