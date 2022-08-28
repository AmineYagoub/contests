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
      ContestAnnulled
    </StyledSection>
  );
};

export default ContestAnnulled;
