import Image from 'next/image';
import styled from '@emotion/styled';
import { Col, Typography } from 'antd';
import { AppRoutes } from '@/utils/routes';
import StyledButton from '../common/StyledButton';
import { StyledParagraph } from './HowItWorkSection';
import { StyledSection } from './ContestCategoriesSection';

const { Title } = Typography;

const StyledCol = styled(Col)({
  position: 'relative',
  boxShadow:
    'var(--ant-primary-color) 0px 13px 27px -5px, var(--ant-primary-color) 0px 8px 16px -8px !important',
  borderRadius: 5,
  height: 550,
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
  '.ant-btn': {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 150,
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
          ما عليك – أخي المعلِّم - سوى الاشتراك في إحدى الباقات الذهبيَّة؛ لتبدأ
          بعدها فورًا في إنشاء مسابقات خاصَّة بك؛ ليتمكَّن طلَّابك من خوض
          التَّحدِّي في أيِّ وقتٍ تحت إشرافك ومراقبتك، وبصلاحيَّاتٍ كاملة؛ حيث
          يمكنك في كلِّ مرَّة تحديد: عدد الأسئلة – وقت الامتحان وتاريخه ومدَّته
          – أسماء الموضوعات – عدد الأسئلة حسب تصنيفها (سهل – متوسِّط الصُّعوبة –
          صعب )، مع استلامك تقريرًا شاملا عن نتيجة الامتحان بمجرَّد انتهائه.
        </StyledParagraph>

        <StyledButton
          size="large"
          type="primary"
          shape="round"
          href={AppRoutes.SignUp}
        >
          اشترك الآن
        </StyledButton>
      </StyledCol>
      <StyledCol span={10}>
        <Image src="/img/student.png" alt="student" width={100} height={100} />
        <Title level={3}>قم بالإشراف على الطلاب الخاصين بك</Title>
        <StyledParagraph>
          سجل معنا مجَّانًا لتتمكَّن من التَّواصُل المباشر مع طلَّابك والإشراف
          على مسابقاتهم والاطلاع على نتائجهم ليس هذا فقط، وإنَّما شارك
          الطُّلَّاب المشتركِين تحت إشرافك في الجوائز المادِّيَّة التي يحصلون
          عليها!!
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
