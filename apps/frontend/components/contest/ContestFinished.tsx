import { StyledSection } from './ContestWelcome';

import { Button, Result } from 'antd';

const ContestFinished = ({
  loading,
  answerId,
  contestId,
}: {
  loading: boolean;
  answerId: string;
  contestId: string;
}) => {
  return (
    <StyledSection
      exit={{ y: -30, opacity: 0 }}
      transition={{ type: 'spring' }}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Result
        status="success"
        title={
          <h2 style={{ color: '#fff' }}>
            تهانينا! أكملت كل الإجابات في الوقت المحدد للمسابقة
          </h2>
        }
        extra={
          <Button
            type="default"
            size="large"
            ghost
            loading={loading}
            href={`/profile/results/${answerId}?cid=${contestId}`}
          >
            شاهد النتيجة
          </Button>
        }
      />
    </StyledSection>
  );
};

export default ContestFinished;
