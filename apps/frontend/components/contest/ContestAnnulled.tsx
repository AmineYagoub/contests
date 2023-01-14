import { Button, Result } from 'antd';
import React from 'react';

import { StyledSection } from './ContestWelcome';

const ContestAnnulled = ({
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
        status="warning"
        title={
          <h2 style={{ color: '#fff' }}>
            للأسف إنتهى الوقت المخصص لمشاركتك في هذه المسابقة! نتمنى لك حظا أوفر
            في المسابقات اللاحقة
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

export default ContestAnnulled;
