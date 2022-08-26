import {
  Button,
  Col,
  Layout,
  PageHeader,
  Row,
  Space,
  Statistic,
  Tag,
} from 'antd';
import Link from 'next/link';

import ContestQuestionnaire from '@/components/contest/ContestQuestionnaire';
import { AppRoutes } from '@/config/routes';
import theme from '@/config/theme';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Content } = Layout;
const StyledContent = styled(Content)({
  width: '65% !important',
  backgroundColor: theme.infoColor,
  textAlign: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  maxHeight: '600px !important',
});

const StyledStat = styled(Statistic)({
  ['.ant-statistic-content']: {
    height: 30,
    justifyContent: 'center',
  },
});

const StyledStatLevels = styled(Statistic)({
  ['.ant-statistic-content']: {
    height: 30,
    justifyContent: 'center',
  },
  ['.ant-statistic-content-value']: {
    display: 'none',
  },
});

const { Countdown } = Statistic;
const StyledCountdown = styled(Countdown)({
  ['.ant-statistic-content']: {
    height: 30,
    justifyContent: 'center',
  },
});

const StyledCol = styled(Col)({
  textAlign: 'center',
});

const StyledNavigationBtn = styled(Space)({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  top: 15,
  button: {
    backgroundImage:
      'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
    color: 'white',
    boxShadow: ' 0 0 20px #eee',
  },
});

const StartContestPage = () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
  return (
    <Layout>
      <PageHeader
        onBack={() => null}
        title={<Link href={AppRoutes.Home}>{`الرئيسية`}</Link>}
        subTitle="عنوان المسابقة الرئيسي"
        style={{ backgroundColor: theme.successColor }}
        extra={
          <StyledNavigationBtn>
            <Button icon={<RightOutlined />} shape="circle" size="large" />
            <strong>تصفح الأسئلة</strong>
            <Button icon={<LeftOutlined />} shape="circle" size="large" />
          </StyledNavigationBtn>
        }
      >
        <Row justify="center">
          <StyledCol span={6}>
            <StyledStatLevels
              title="مستوى المسابقة"
              value=""
              suffix={[13, 14, 15].map((el) => (
                <Tag key={el} color="green">
                  {el}
                </Tag>
              ))}
            />
          </StyledCol>
          <StyledCol span={6}>
            <StyledCountdown
              title="الوقت المتبقي"
              value={deadline}
              format="HH:mm:ss"
            />
          </StyledCol>
          <StyledCol span={6}>
            <StyledStat title="عدد الأسئلة" value={93} suffix="/ 100" />
          </StyledCol>
        </Row>
      </PageHeader>
      <StyledContent>
        <ContestQuestionnaire />
      </StyledContent>
    </Layout>
  );
};

export default StartContestPage;
