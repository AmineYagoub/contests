import ContestLayout from '@/layout/ContestLayout';
import { NextPageWithLayout } from '@/utils/types';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import styled from '@emotion/styled';

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

const ContestComingSoon: NextPageWithLayout = ({ time }: { time: string }) => {
  return (
    <StyledContainer>
      <h1>قريبا ستبدأ المسابقة ... </h1>
      <FlipClockCountdown
        style={{ direction: 'ltr' }}
        to="2023-01-01T14:27:32.635Z"
        labels={['يوم', 'ساعة', 'دقيقة', 'ثانية']}
        labelStyle={{
          fontSize: '1rem',
          fontWeight: 800,
        }}
        digitBlockStyle={{
          background: 'linear-gradient(to bottom, #41295a, #2f0743)',
        }}
      />
    </StyledContainer>
  );
};

export async function getServerSideProps({ req, query }) {
  if (!query.time) {
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
    },
  };
}

ContestComingSoon.getLayout = (page: EmotionJSX.Element) => (
  <ContestLayout>{page}</ContestLayout>
);
export default withAuth(ContestComingSoon, [
  PermissionTitle.AccessStudentDashboard,
]);
