import {
  TrophyOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { AppRoutes } from '@/utils/routes';
import { Col, Space, Typography } from 'antd';
import StyledButton from '../common/StyledButton';
import { StyledContainer, StyledParagraph } from './HeroSEction';

const { Title } = Typography;

const iconsStyle = {
  fontSize: '1.3rem',
  color: 'purple',
  display: 'inline-block',
  width: 50,
};

const GoodEducationSection = () => {
  return (
    <StyledContainer>
      <Col span={14} style={{ position: 'relative', height: 570 }}>
        <Image
          src="/img/competitions.png"
          alt="Picture of the author"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Col>
      <Col span={10}>
        <Title level={2}>
          نقدم لك بيئة حية سحابية لتختبر مهاراتك وقدراتك النحوية بشكل واقعي و
          ممتع!
        </Title>
        <StyledParagraph>
          المسابقات التي نقدمها لا تكسبك المهارات فحسب ، بل تساعدك أيضًا على
          توسيع آفاقك واكتساب منظور أفضل وتعلمك التفكير بنفسك. أصبح الناس اليوم
          مدركين تمامًا أهمية النطق السليم ومرتاحين بالتحدث باللغة العربية
          الفصحى أكثر من أي وقت مضى.
        </StyledParagraph>
        <Space size={50} style={{ width: '100%' }}>
          <span style={{ display: 'inline-block', width: 150 }}>
            <TrophyOutlined style={iconsStyle} />
            <b>150+ مسابقة</b>
          </span>
          <span>
            <QuestionCircleOutlined style={iconsStyle} /> <b>2600+ سؤال</b>
          </span>
        </Space>

        <Space size={50} style={{ width: '100%', margin: '1em 0' }}>
          <span style={{ display: 'inline-block', width: 150 }}>
            <FundProjectionScreenOutlined style={iconsStyle} /> <b>120+ معلم</b>
          </span>
          <span>
            <ContactsOutlined style={iconsStyle} /> <b>800+ طالب</b>
          </span>
        </Space>

        <StyledButton
          size="large"
          type="primary"
          shape="round"
          style={{ width: 200, marginTop: 20 }}
          href={AppRoutes.SignUp}
        >
          انضم إلينا
        </StyledButton>
      </Col>
    </StyledContainer>
  );
};

export default GoodEducationSection;
