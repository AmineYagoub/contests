import Image from 'next/image';
import styled from '@emotion/styled';
import { Col, Typography } from 'antd';
import { StyledSection } from './ContestCategoriesSection';
import { StyledParagraph } from './HowItWorkSection';
import StyledButton from '../common/StyledButton';
import { AppRoutes } from '@/utils/routes';

const { Title } = Typography;

const StyledCol = styled(Col)({
  boxShadow:
    'var(--ant-primary-color) 0px 13px 27px -5px, var(--ant-primary-color) 0px 8px 16px -8px !important',
  borderRadius: 5,
  height: 450,
  minWidth: 620,
  textAlign: 'left',
  padding: 50,
  img: {
    objectFit: 'contain',
  },
  h3: {
    fontSize: '2rem !important',
    margin: '20px 0',
  },
  button: {
    marginTop: '2em',
    width: 200,
  },
});

const TwoWayInstructor = () => {
  return (
    <StyledSection style={{ marginTop: 100 }}>
      <Title level={2}>طريقتان لتصبح معلما مشرفا</Title>
      <StyledCol span={10}>
        <Image src="/img/cup.png" alt="contest cup" width={100} height={100} />
        <Title level={3}>قم بإنشاء المسابقات الخاصة بك</Title>
        <StyledParagraph>
          ما عليك سوى الإشتراك في إحدى الباقات الذهبية و بدء إنشاء مسابقات خاصة
          بك ليتمكن طلابك من خوض التحدي تحت إشرافك و مراقبتك.
        </StyledParagraph>

        <StyledButton
          size="large"
          type="primary"
          shape="round"
          href={AppRoutes.SignUp}
        >
          إشترك الآن
        </StyledButton>
      </StyledCol>
      <StyledCol span={10}>
        <Image src="/img/student.png" alt="student" width={100} height={100} />
        <Title level={3}>قم بالإشراف على الطلاب الخاصين بك</Title>
        <StyledParagraph>
          سجل معنا مجانا لتتمكن من التواصل المباشر مع طلابك و الإشراف على
          مسابقاتهم و الإطلاع على نتائجهم.
        </StyledParagraph>
        <StyledButton
          size="large"
          type="primary"
          shape="round"
          href={AppRoutes.SignUp}
        >
          سجل الآن
        </StyledButton>
      </StyledCol>
    </StyledSection>
  );
};

export default TwoWayInstructor;
