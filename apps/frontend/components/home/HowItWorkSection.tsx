import Image from 'next/image';
import theme from '@/config/theme';
import styled from '@emotion/styled';
import { Col, Row, Typography } from 'antd';
import HowItWorkDashedSvg from './HowItWorkDashedSvg';

const { Title, Paragraph } = Typography;

export const title = {
  lineHeight: '1.05em',
  color: 'transparent',
  background: `linear-gradient(to left, ${theme.primaryColor}, #ef32d9)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const StyledNumbers = styled('span')({
  width: 32,
  height: 32,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.primaryColor,
  color: '#fff',
  margin: '0 auto',
  zIndex: 1,
});

export const StyledParagraph = styled(Paragraph)({
  marginTop: 24,
  fontSize: 20,
  lineHeight: 1.6,
  color: '#525466 !important',
  fontWeight: 400,
  maxWidth: 700,
});

const StyledStepper = styled(Row)({
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  backgroundImage:
    'linear-gradient( to bottom, #ffffff00, #edfcffff 0, #fff 100% )',
  textAlign: 'center',
  marginTop: -10,
  '.ant-row': {
    width: '100%',
    justifyContent: 'space-around',
  },
  svg: {
    position: 'absolute',
    paddingTop: 50,
    left: '50%',
    top: 10,
    transform: 'translate(-50%, -10px) rotate(0.7deg)',
    '.dashed-line': {
      animation: 'dashedLineAnimation 1000ms linear infinite',
    },
  },
  h3: {
    fontSize: '3.5rem !important',
    ...title,
  },
  '.first': {
    marginTop: 30,
  },
});

const HowItWorkSection = () => {
  return (
    <StyledStepper>
      <Title level={3}>كيف يعمل؟</Title>
      <Row>
        <Col span={6}>
          <Title level={4}>سجل حسابك الخاص</Title>
          <StyledParagraph>
            سجل حسابك بطريقة سهلة و سريعة ثم أتمم تعبئة بياناتك الشخصية في صفحتك
            الشخصية
          </StyledParagraph>
        </Col>
        <Col span={6}>
          <StyledNumbers className="first">1</StyledNumbers>
        </Col>
        <Col span={6}>
          <Image
            src="/img/first-step.png"
            alt="register new account"
            height={250}
            width={250}
            style={{ objectFit: 'contain' }}
          />
        </Col>
      </Row>
      <Row style={{ margin: '4em auto' }}>
        <Col span={6}>
          <Title level={4}>اختر مشرفا</Title>
          <StyledParagraph>
            اختر لنفسك معلِّمًا مشرفًا يكن خير عونٍ لك، ويشاركك الفرحة والنَّجاح
            والجوائز المادِّيَّة؛ فجوائزنا ليست للطُّلَّاب الفائزِين وحدهم،
            وإنَّما لمعلِّمِيهم المشرفِين عليهم أيضًا.
          </StyledParagraph>
        </Col>
        <Col span={6}>
          <StyledNumbers className="first">2</StyledNumbers>
        </Col>
        <Col span={6}>
          <Image
            src="/img/second-step.png"
            alt="register new account"
            height={250}
            width={250}
            style={{ objectFit: 'contain' }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Title level={4}>شارك في المسابقات</Title>
          <StyledParagraph>
            تعقد منصَّة أولمبياد النَّحو العربيِّ مسابقات بالغة الإثارة والمتعة
            في النَّحو، كما تقدِّم العديد من الجوائز والهدايا للطَّلبة
            المتفوِّقِين في النَّحو (ولمشرفِيهم من المعلِّمِين ) تشجيعًا لهم على
            الاهتمام بالنَّحو العربيِّ الأصيل. الاشتراك في جميع المسابقات
            مجانيَّ تمامًا بالنِّسبة لجميع أبنائنا الطُّلَّاب في كلِّ دول
            العالم.
          </StyledParagraph>
        </Col>
        <Col span={6}>
          <StyledNumbers className="first">3</StyledNumbers>
        </Col>
        <Col span={6}>
          <Image
            src="/img/third-step.png"
            alt="apply for contest"
            height={250}
            width={250}
            style={{ objectFit: 'contain' }}
          />
        </Col>
      </Row>
      <HowItWorkDashedSvg />
    </StyledStepper>
  );
};

export default HowItWorkSection;
