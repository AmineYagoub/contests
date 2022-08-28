import { Button, List } from 'antd';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ContestActions } from '@/valtio/contest.state';

const data = [
  'الأجوبة ستكون إختيار من متعدد و عليك إختيار إجابة صحيحة من عدة خيارات.',
  'بعد إنتهاء زمن المسابقة ومرحلة التقديم لن يتم قبول أي إجابة جديدة.',
  'لا يسمح لك بتصغير أو تغيير نافذة المتصفح أو إغلاقها و العودة إلى المسابقة.',
  'يجب ألا يختلف مستوى المتسابق على المستوى المحدد لهذه المسابقة .',
  'سيكون متاحا لك الإطلاع على نتيجتك و أدائك مباشرة بعد إنتهائك من المسابقة.',
  'بعد إنتهاء المسابقة سيتم إرسال أسماء العشرة الأوائل وأسماء مشرفيهم وما حققوه من درجات لكل المشتركين في المسابقة.',
  'بموجب المشاركة في المسابقة، يوافق جميع المشاركين على التقيد بالشروط والأحكام الخاصة بالمسابقة.',
];

export const StyledSection = styled(motion.section)({
  padding: 10,
  h1: {
    fontSize: '3.5rem',
  },
  p: {
    fontSize: '1.3rem',
  },
});

const StyledBtn = styled(Button)({
  backgroundImage:
    'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%) !important',
  color: 'white !important',
  borderRadius: '35px !important',
  border: 'none !important',
  width: 250,
  marginTop: 20,
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important',
});

const ContestWelcome = () => {
  return (
    <StyledSection
      exit={{ y: -30, opacity: 0 }}
      transition={{ type: 'spring' }}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <p>يرجى التقيد بشروط و أحكام المسابقة حتى لا تعتبر مشاركتك ملغاة</p>
      <List
        size="default"
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <StyledBtn
        size="large"
        onClick={() => ContestActions.setContestStarted(true)}
      >
        إبدأ الآن
      </StyledBtn>
    </StyledSection>
  );
};

export default ContestWelcome;
