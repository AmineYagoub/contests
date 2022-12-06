import { Layout, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ContestLoadingHeader from '@/components/contest/ContestLoadingHeader';
import ContestPageHeader from '@/components/contest/ContestPageHeader';
import { Contest, useFindByIdForExamLazyQuery } from '@/graphql/graphql';
import { ContestActions } from '@/valtio/contest.state';
import styled from '@emotion/styled';

const { Content } = Layout;

const StyledContent = styled(Content)({
  width: '65% !important',
  backgroundColor: '#ffffff21',
  color: '#ffffff',
  textAlign: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  maxHeight: '600px !important',
});

const StyledLayout = styled(Layout)({
  backgroundImage: 'url("/img/contest-bg.jpg") !important',
  backgroundSize: '100% !important',
  perspective: 700,
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const ContestLayout = ({ children }) => {
  const router = useRouter();
  const [FindByIdForExamQuery, { loading }] = useFindByIdForExamLazyQuery();

  useEffect(() => {
    document.addEventListener('visibilitychange', function () {
      ContestActions.setContestAnnulled();
    });
    if (router.query.key) {
      FindByIdForExamQuery({
        variables: { id: String(router.query.key) },
      })
        .then(({ data }) => {
          if (!data.findOneContestById) {
            router.push('/');
            return;
          }
          ContestActions.setContest(data.findOneContestById as Contest);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const handleRouteChange = (url: string) => {
      if (url !== router.asPath) {
        ContestActions.setContestAnnulled();
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.query.key, router, FindByIdForExamQuery]);

  return (
    <StyledLayout>
      {loading ? <ContestLoadingHeader /> : <ContestPageHeader />}
      <StyledContent>
        {loading ? <Spin size="large" /> : children}
      </StyledContent>
    </StyledLayout>
  );
};

export default ContestLayout;
