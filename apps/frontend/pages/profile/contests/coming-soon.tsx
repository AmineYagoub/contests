import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { getContestRoute } from '@/utils/routes';
import ContestLayout from '@/layout/ContestLayout';
import { NextPageWithLayout } from '@/utils/types';
import { PermissionTitle } from '@/graphql/graphql';
import { withAuth } from '@/components/common/withAuth';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/app';

const StyledContainer = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  h1: {
    color: '#fff',
    fontSize: '3rem',
    margin: '1.5em auto',
  },
});

const ContestComingSoon: NextPageWithLayout = ({
  time,
  id,
}: {
  time: string;
  id: string;
}) => {
  const router = useRouter();
  const [h1, setH1] = useState('قريبا ستبدأ المسابقة ... ');
  const onComplete = () => {
    setH1(null);
    router.push(getContestRoute(id));
  };
  return (
    <>
      <Head>
        <title>{getTitleMeta('ألمبياد النحو العربي', 'قريبا')}</title>
      </Head>

      <StyledContainer>
        <h1>{h1}</h1>
        <FlipClockCountdown
          style={{ direction: 'ltr' }}
          to={time}
          labels={['يوم', 'ساعة', 'دقيقة', 'ثانية']}
          labelStyle={{
            fontSize: '1rem',
            fontWeight: 800,
          }}
          digitBlockStyle={{
            background: 'linear-gradient(to bottom, #41295a, #2f0743)',
          }}
          onComplete={onComplete}
        >
          <h1>جاري تحويلك لصفحة المسابقة ...</h1>
        </FlipClockCountdown>
      </StyledContainer>
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  if (!query.time || !query.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      time: String(query.time),
      id: String(query.id),
    },
  };
}

ContestComingSoon.getLayout = (page: EmotionJSX.Element) => (
  <ContestLayout>{page}</ContestLayout>
);
export default withAuth(ContestComingSoon, [], true);
