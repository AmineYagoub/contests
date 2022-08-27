import { Layout, Spin } from 'antd';

import theme from '@/config/theme';
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
  backgroundColor: theme.infoColor,
  textAlign: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  maxHeight: '600px !important',
});

const StartContestPage: NextPage = () => {
  const router = useRouter();
  const [FindByIdForExamQuery, { loading }] = useFindByIdForExamLazyQuery();

  useEffect(() => {
    if (router.query.key) {
      FindByIdForExamQuery({
        variables: { id: router.query.key as string, isExam: true },
      }).then(({ data }) =>
        ContestActions.setContest(data.findOneContestById as Contest)
      );
    }
  }, [router.query.key]);
  return (
    <Layout>
      {loading ? <ContestLoadingHeader /> : <ContestPageHeader />}
      <StyledContent>
        {loading ? <Spin size="large" /> : <ContestStarter />}
      </StyledContent>
    </Layout>
  );
};

export default StartContestPage;
