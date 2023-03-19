import {
  App,
  FindAppConfigQuery,
  FindAppConfigDocument,
  FindAppConfigQueryVariables,
  FindAllTopicsQuery,
  FindAllTopicsQueryVariables,
  FindAllTopicsDocument,
  Topic,
} from '@/graphql/graphql';
import Head from 'next/head';
import HomeLayout from '@/layout/HomeLayout';
import { NextPageWithLayout } from '@/utils/types';
import { appDataVar, getTitleMeta } from '@/utils/app';
import { withAuth } from '@/components/common/withAuth';
import HeroSEction from '@/components/home/HeroSEction';
import HowItWorkSvg from '@/components/home/HowItWorkSvg';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { initializeApollo } from '@/config/createGraphQLClient';
import HowItWorkSection from '@/components/home/HowItWorkSection';
import TwoWayInstructor from '@/components/home/TwoWayInstructor';
import ContestCategoriesSection from '@/components/home/ContestCategoriesSection';
import GoodEducationSection from '@/components/home/GoodEducationSection';

const itemJsonLd = (data: App) => {
  return {
    __html: `{
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "url": "https://olympiadnahw.com",
    "name": "${data.title}",
    "description": "${data.description}",
    "openingHours": "Mo-Su",
    "logo": "http://cdn.elite-strategies.com/wp-content/uploads/2013/04/elitestrategies.png",
    "foundingDate": "2023",
    "founders": [
      {
        "@type": "Person",
        "name": "يسري محمد سلال"
      },
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "23 El Montaza St., Heliopolis Sq.",
      "addressLocality": "Heliopolis",
      "addressRegion": "Cairo",
      "postalCode": "11757",
      "addressCountry": "Egypt"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "admin@olympiadnahw.com"
      },
    "sameAs": [
      "http://www.facebook.com/${data.facebookUrl}",
      "http://www.twitter.com/${data.twitterUrl}",
      "http://instagram.com/${data.instagramUrl}",
      "http://www.youtube.com/${data.youtubeUrl}",
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://olympiadnahw.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
`,
  };
};

const Index: NextPageWithLayout = ({
  data,
  topics,
}: {
  data: App;
  topics: Topic[];
}) => {
  appDataVar(data);
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title)}</title>
        <meta name="description" content={data?.description} key="desc" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@olympiadnahw" />
        <meta name="twitter:creator" content="@olympiadnahw" />
        <meta name="twitter:domain" content="olympiadnahw.com/"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content={data?.title} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd(data)}
          key="jsonld"
        />
      </Head>
      <HeroSEction />
      <ContestCategoriesSection
        topics={topics.slice(0, 14)}
        length={topics.length}
      />
      <GoodEducationSection />
      <HowItWorkSvg />
      <HowItWorkSection />
      <TwoWayInstructor />
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const client = initializeApollo({ headers: req?.headers });
  try {
    const {
      data: { findAppConfig },
    } = await client.query<FindAppConfigQuery, FindAppConfigQueryVariables>({
      query: FindAppConfigDocument,
    });

    const {
      data: { findAllTopics },
    } = await client.query<FindAllTopicsQuery, FindAllTopicsQueryVariables>({
      query: FindAllTopicsDocument,
      variables: { take: 200 },
    });

    return {
      props: {
        data: findAppConfig,
        topics: findAllTopics,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default withAuth(Index, null, true);
