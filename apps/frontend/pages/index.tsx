import { Col, Row, Space, Typography } from 'antd';
import theme from '@/config/theme';
import HomeLayout from '@/layout/HomeLayout';
import { NextPageWithLayout } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import StyledButton from '@/components/common/StyledButton';

import Image from 'next/image';
import { withAuth } from '@/components/common/withAuth';
import styled from '@emotion/styled';
import HowItWorkSvg from '@/components/home/HowItWorkSvg';
import HowItWorkSection from '@/components/home/HowItWorkSection';
import ContestCategoriesSection from '@/components/home/ContestCategoriesSection';
import TwoWayInstructor from '@/components/home/TwoWayInstructor';

const { Title, Paragraph } = Typography;

const title = {
  lineHeight: '1.05em',
  color: 'transparent',
  background: `linear-gradient(to left, ${theme.primaryColor}, #ef32d9)`,
  ['-webkit-background-clip']: 'text',
  ['-webkit-text-fill-color']: 'transparent',
};

const StyledContainer = styled(Row)({
  padding: '0 25px',
  justifyContent: 'center',
  alignItems: 'center',
  h1: {
    fontSize: '4rem !important',
    ...title,
  },
});

const StyledParagraph = styled(Paragraph)({
  marginTop: 24,
  fontSize: 20,
  lineHeight: 1.6,
  color: '#525466 !important',
  fontWeight: 400,
  maxWidth: 700,
});

const Index: NextPageWithLayout = (props) => {
  return (
    <>
      <StyledContainer>
        <Col span={14}>
          <Title>مسابقات مجانية لكل طلاب العالم في النحو و اللغة العربية</Title>
          <StyledParagraph>
            تقدم منصة ألمبياد النحو العربي العديد من المسابقات والجوائز لجميع
            الأعمار إبتداءا من الصف السادس الإبتدائي إلى الصف الثالث الثانوي.
          </StyledParagraph>
          <Space style={{ marginTop: 20 }}>
            <StyledButton size="large">سجل كمعلم</StyledButton>
            <StyledButton
              size="large"
              type="primary"
              shape="round"
              style={{ width: 200 }}
            >
              إنظم إلينا
            </StyledButton>
          </Space>
        </Col>
        <Col span={10} style={{ position: 'relative', height: 570 }}>
          <Image
            src="/img/teamwork.png"
            alt="Picture of the author"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Col>
      </StyledContainer>
      <ContestCategoriesSection />
      <HowItWorkSvg />
      <HowItWorkSection />
      <TwoWayInstructor />
    </>
  );
};
Index.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;
export default withAuth(Index, null, true);
