import { Button, List } from 'antd';

import styled from '@emotion/styled';

const data = [
  'الأجوبة ستكون إختيار من متعدد و عليك إختيار إجابة صحيحة من عدة خيارات.',
  'بعد إنتهاء زمن المشاركة ومرحلة التقديم لن يتم قبول أي إجابة جديدة.',
  'سيكون متاحا لك الإطلاع على نتيجتك و أدائك مباشرة بعد إنتهائك من المسابقة.',
  'بعد إنتهاء المسابقة سيتم إرسال أسماء العشرة الأوائل وأسماء مشرفيهم وما حققوه من درجات لكل المشتركين في المسابقة.',
  'لا يسمح لك بتصغير أو تغيير نافذة المتصفح أو إغلاقها و العودة إليها.',
  'يجب ألا يختلف سن المتسابق على السن المحدد لهذه المسابقة .',
  'بموجب المشاركة في المسابقة، يوافق جميع المشاركين على التقيد بالشروط والأحكام الخاصة بالمسابقة.',
];

export const StyledSection = styled('section')({
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
  boxShadow: ' 0 0 20px #eee',
  width: 250,
  marginTop: 20,
});

const ContestWelcom = () => {
  return (
    <StyledSection>
      <h1>عنوان المسابقة</h1>
      <p>يرجى التقيد بشروط و أحكام المسابقة حتى لا تعتبر مشاركتك ملغاة</p>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <StyledBtn size="large">إبدأ الآن</StyledBtn>
    </StyledSection>
  );
};

export default ContestWelcom;
