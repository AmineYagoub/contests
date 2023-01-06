import Head from 'next/head';
import { useReactiveVar } from '@apollo/client';
import { appDataVar, getTitleMeta } from '@/utils/app';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import HomeLayout from '@/layout/HomeLayout';
import styled from '@emotion/styled';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  padding: '1em 5em',
  p: {
    whiteSpace: 'normal',
    fontSize: '1.1rem',
  },
});

export function UserAgreementPage() {
  const siteData = useReactiveVar(appDataVar);
  return (
    <StyledSection>
      <Head>
        <title>{getTitleMeta(siteData?.title, 'إتفاقية الإستخدام')}</title>
      </Head>
      <p
        style={{ direction: 'rtl', whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: siteData?.agreement }}
      ></p>
    </StyledSection>
  );
}

UserAgreementPage.getLayout = (page: EmotionJSX.Element) => (
  <HomeLayout>{page}</HomeLayout>
);
export default UserAgreementPage;
// TODO get data by ssr
