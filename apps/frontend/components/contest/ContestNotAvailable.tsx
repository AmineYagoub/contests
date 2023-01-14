import { Button, Result } from 'antd';
import React from 'react';

import { StyledSection } from './ContestWelcome';

const ContestNotAvailable = () => {
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
          <>
            <h2 style={{ color: '#fff' }}>
              للأسف لا يمكنك المشاركة في هذه المسابقة!
            </h2>
            <h3 style={{ color: '#fff' }}>
              نتمنى لك حظا أوفر في المسابقات اللاحقة
            </h3>
          </>
        }
        extra={
          <Button type="default" size="large" ghost href="/profile/contests">
            صفحة المسابقات
          </Button>
        }
      />
    </StyledSection>
  );
};

export default ContestNotAvailable;
