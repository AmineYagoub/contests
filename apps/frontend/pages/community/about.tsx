import {
  App,
  FindAboutUsPageQuery,
  FindAboutUsPageDocument,
  FindAboutUsPageQueryVariables,
} from '@/graphql/graphql';
import Head from 'next/head';
import styled from '@emotion/styled';
import HomeLayout from '@/layout/HomeLayout';
import { appDataVar, getTitleMeta } from '@/utils/app';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { initializeApollo } from '@/config/createGraphQLClient';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  padding: '1em 5em',
  p: {
    whiteSpace: 'normal',
    fontSize: '1.1rem',
  },
});

export function AboutUsPage({ data }: { data: App }) {
  appDataVar(data);
  return (
    <StyledSection>
      <Head>
        <title>{getTitleMeta(data?.title, 'حول الموقع')}</title>
      </Head>
      <article
        style={{ direction: 'rtl', whiteSpace: 'pre-wrap', minHeight: '80vh' }}
        dangerouslySetInnerHTML={{ __html: data.aboutUs }}
      />
    </StyledSection>
  );
}

export async function getServerSideProps({ req, query }) {
  const client = initializeApollo({ headers: req?.headers });
  try {
    const {
      data: { findAppConfig },
    } = await client.query<FindAboutUsPageQuery, FindAboutUsPageQueryVariables>(
      {
        query: FindAboutUsPageDocument,
      }
    );

    return {
      props: {
        data: findAppConfig,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

AboutUsPage.getLayout = (page: EmotionJSX.Element) => (
  <HomeLayout>{page}</HomeLayout>
);

export default withAuth(AboutUsPage, null, true);
