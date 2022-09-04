import { Layout, Spin } from 'antd';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Contest, useFindByIdForExamLazyQuery } from '@/graphql/graphql';
import { useEffect } from 'react';
import ContestPageHeader from '@/components/contest/ContestPageHeader';
import ContestLoadingHeader from '@/components/contest/ContestLoadingHeader';
import ContestStarter from '@/components/contest/ContestStarter';
import { ContestActions } from '@/valtio/contest.state';

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

const StartContestPage: NextPage = (props) => {
  const router = useRouter();
  const [FindByIdForExamQuery, { loading }] = useFindByIdForExamLazyQuery();

  useEffect(() => {
    document.addEventListener('visibilitychange', function () {
      alert('the tab hath changed');
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
  }, [router.query.key]);

  return (
    <StyledLayout>
      {loading ? <ContestLoadingHeader /> : <ContestPageHeader />}
      <StyledContent>
        {loading ? (
          <Spin size="large" />
        ) : (
          <ContestStarter contestId={String(router.query.key)} />
        )}
      </StyledContent>
    </StyledLayout>
  );
};

export default StartContestPage;
