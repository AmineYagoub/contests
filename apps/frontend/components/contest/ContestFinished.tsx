import React from 'react';
import { StyledSection } from './ContestWelcome';

const ContestFinished = () => {
  return (
    <StyledSection
      exit={{ y: -30, opacity: 0 }}
      transition={{ type: 'spring' }}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      ContestFinished
    </StyledSection>
  );
};

export default ContestFinished;
