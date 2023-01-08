import Image from 'next/image';
import theme from '@/config/theme';
import styled from '@emotion/styled';
import { Col, Row, Space, Typography } from 'antd';
import StyledButton from '@/components/common/StyledButton';
import { AppRoutes } from '@/utils/routes';

const { Title, Paragraph } = Typography;

const title = {
  lineHeight: '1.05em',
  color: 'transparent',
  background: `linear-gradient(to left, ${theme.primaryColor}, #ef32d9)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const StyledContainer = styled(Row)({
  padding: '0 25px',
  justifyContent: 'center',
  alignItems: 'center',
  h1: {
    fontSize: '4rem !important',
    ...title,
  },
  h2: {
    ...title,
  },
});

export const StyledParagraph = styled(Paragraph)({
  marginTop: 24,
  fontSize: 20,
  lineHeight: 1.6,
  color: '#525466 !important',
  fontWeight: 400,
  maxWidth: 700,
});

const HeroSEction = () => {
  return (
    <StyledContainer>
      <Col span={14}>
        <Title>مسابقات مجانية لكل طلاب العالم في النحو و اللغة العربية</Title>
        <StyledParagraph>
          تقدم منصة ألمبياد النحو العربي العديد من المسابقات والجوائز لجميع
          الأعمار إبتداءا من الصف السادس الإبتدائي إلى الصف الثالث الثانوي.
        </StyledParagraph>
        <Space style={{ marginTop: 20 }}>
          <StyledButton size="large" shape="round" href={AppRoutes.SignUp}>
            سجل كمعلم
          </StyledButton>
          <StyledButton
            href={AppRoutes.SignUp}
            size="large"
            type="primary"
            shape="round"
            style={{ width: 200 }}
          >
            شارك معنا
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
  );
};

export default HeroSEction;
