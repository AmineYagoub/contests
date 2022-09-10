import { Button, Result } from 'antd';
import React from 'react';

import { StyledSection } from './ContestWelcome';

const ContestAnnulled = () => {
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
            للأسف تم إلغاء مشاركتك في هذه المسابقة! نتمنى لك حظا أوفر في
            المسابقات اللاحقة
          </h2>
        }
        extra={
          <Button type="default" size="large" ghost href={`/`}>
            الرئيسية
          </Button>
        }
      />
    </StyledSection>
  );
};

export default ContestAnnulled;
