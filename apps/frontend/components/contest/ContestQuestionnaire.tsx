import { Divider } from 'antd';
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';
import { useEffect, useState } from 'react';

import { CheckCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const StyledSection = styled('section')({
  padding: 10,
  textAlign: 'center',
  h2: {
    fontSize: '2rem',
  },
});

export const StyledAnswers = styled(motion.button)({
  width: 400,
  display: 'flex !important',
  padding: '12px 10px 12px 35px',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.2rem',
  margin: '5px auto',
  border: 'none',
  color: 'white',
  borderRadius: 5,
  backgroundImage:
    'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
});

export const StyledIcon = styled(CheckCircleOutlined)({
  position: 'absolute',
  top: '50%',
  left: '3%',
  transform: 'translate(0, -50%)',
  fontSize: 18,
  color: 'white !important',
  zIndex: 10,
});

export const StyledContainer = styled(motion.div)({
  position: 'relative',
  margin: 'auto',
  maxWidth: 400,
});

const tap = {
  scale: 1,
};
const focus = {
  scale: 1.03,
  color: 'white',
  backgroundImage:
    'linear-gradient( 109.6deg,  rgba(0,191,165,1) 11.2%, rgba(0,140,122,1) 100.2% )',
};
const hover = {
  cursor: 'pointer',
  scale: 1.03,
  backgroundImage:
    'linear-gradient( 109.6deg,  rgba(0,191,165,1) 11.2%, rgba(0,140,122,1) 100.2% )',
};
const variants: Variants = {
  selected: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
};

interface AnswerOptionProps {
  data: string[];
}

const AnswerOptions = ({ data }: AnswerOptionProps) => {
  const [selected, setSelected] = useState(null);
  const controls = useAnimationControls();

  const list = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hidden: (i: number) => ({
      opacity: 0,
      y: -100,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  useEffect(() => {
    let t = null;
    if (selected !== null) {
      t = setTimeout(async () => {
        await controls.start('hidden');
        setSelected(null);
        await controls.start('visible');
      }, 500);
    }
    return () => {
      clearTimeout(t);
    };
  }, [selected]);
  return (
    <AnimatePresence initial={false}>
      {data.map((el, i) => (
        <StyledContainer
          key={i}
          style={{ position: 'relative' }}
          custom={i}
          variants={list}
          animate={controls}
        >
          {selected === i && <StyledIcon />}
          <StyledAnswers
            onTapStart={() => setSelected(i)}
            onTapCancel={() => setSelected(null)}
            whileHover={hover}
            whileTap={tap}
            whileFocus={selected !== null ? focus : {}}
          >
            {el}
          </StyledAnswers>
        </StyledContainer>
      ))}
    </AnimatePresence>
  );
};

const answers = [
  'الجواب الاول',
  'الجواب الثاني',
  'الجواب الثالث',
  'الجواب الرابع',
];

const ContestQuestionnaire = () => {
  return (
    <StyledSection>
      <h2>ما هو إعراب كلمة المدثر؟</h2>
      <Divider />
      <AnswerOptions data={answers} />
    </StyledSection>
  );
};

export default ContestQuestionnaire;
