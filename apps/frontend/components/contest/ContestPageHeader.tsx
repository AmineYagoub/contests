import Link from 'next/link';
import { useSnapshot } from 'valtio';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AppRoutes } from '@/utils/routes';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ContestActions, ContestState } from '@/valtio/contest.state';
import { Button, Col, PageHeader, Row, Space, Statistic, Tag } from 'antd';

const valueStyle = {
  fontWeight: 800,
  fontSize: '2rem',
  backgroundImage:
    'linear-gradient( 109.6deg, rgb(0, 191, 165) 11.2%, rgb(153, 225, 216) 100.2% )',
  backgroundClip: 'text',
  color: 'transparent',
};

const StyledStrong = styled('strong')({
  ...valueStyle,
  fontSize: '1.5rem',
  padding: 5,
});

const StyledTopics = styled('section')({
  display: 'flex',
  b: {
    color: '#fff',
  },
  ol: {
    color: '#fff',
  },
});

const StyledStat = styled(Statistic)({
  ['.ant-statistic-content']: {
    height: 35,
    justifyContent: 'center',
  },
  ['.ant-statistic-title']: {
    color: '#fff',
  },
});

const { Countdown } = Statistic;
const StyledCountdown = styled(Countdown)({
  ['.ant-statistic-content']: {
    height: 35,
    justifyContent: 'center',
  },
  ['.ant-statistic-title']: {
    color: '#fff',
  },
});

export const StyledCol = styled(Col)({
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
    boxShadow: '0 0 20px #eee',
  },
});

const ContestPageHeader = () => {
  const contestSnap = useSnapshot(ContestState);
  const router = useRouter();

  if (!contestSnap.contest) {
    return (
      <PageHeader
        onBack={() => null}
        title={
          !contestSnap.contestStarted && (
            <Link href={AppRoutes.Home}>{`الرئيسية`}</Link>
          )
        }
        subTitle={
          <h1 style={{ color: '#fff' }}>{`مسابقة ${
            router.query?.title || contestSnap.contest?.title
          }`}</h1>
        }
        style={{ backgroundColor: '#ffffff21' }}
      />
    );
  }
  const {
    easyQuestionCount,
    mediumQuestionCount,
    hardQuestionCount,
    dictationQuestionCount,
  } = contestSnap.contest;
  const count =
    easyQuestionCount +
    mediumQuestionCount +
    hardQuestionCount +
    dictationQuestionCount;

  const onTimeFinished = () => {
    ContestActions.setContestAnnulled();
  };

  return (
    <PageHeader
      onBack={() => null}
      title={
        !contestSnap.contestStarted && (
          <Link href={AppRoutes.Home}>{`الرئيسية`}</Link>
        )
      }
      subTitle={
        <h1
          style={{ color: '#fff' }}
        >{`مسابقة ${contestSnap.contest.title}`}</h1>
      }
      style={{ backgroundColor: '#ffffff21' }}
      extra={
        contestSnap.answers.length ? (
          <StyledNavigationBtn>
            <Button
              icon={<RightOutlined />}
              shape="circle"
              size="large"
              disabled={
                contestSnap.contestCurrentIndex <= 0 ||
                contestSnap.contestFinished
              }
              onClick={ContestActions.decrementQuestionIndex}
            />
            <StyledStrong>تصفح الأسئلة</StyledStrong>
            <Button
              icon={<LeftOutlined />}
              shape="circle"
              size="large"
              disabled={
                contestSnap.contestCurrentIndex >= contestSnap.answers.length ||
                contestSnap.contestFinished
              }
              onClick={ContestActions.incrementQuestionIndex}
            />
          </StyledNavigationBtn>
        ) : null
      }
    >
      <Row justify="center">
        <Col span={6}>
          <StyledTopics>
            <b>مواضيع المسابقة</b>
            <ol>
              {contestSnap.contest.topics.map((el) => (
                <li key={el.title}>
                  <Tag color="blue">{el.title}</Tag>
                </li>
              ))}
            </ol>
          </StyledTopics>
        </Col>
        <StyledCol span={6}>
          {contestSnap.contestStarted ? (
            <StyledCountdown
              title="الوقت المتبقي"
              value={contestSnap.contestTimeCounter}
              format="HH:mm:ss"
              valueStyle={valueStyle}
              onFinish={onTimeFinished}
            />
          ) : (
            <StyledStat
              title="زمن المسابقة"
              value={contestSnap.contest.duration}
              suffix="دقيقة"
              valueStyle={valueStyle}
            />
          )}
        </StyledCol>
        <StyledCol span={6}>
          <StyledStat
            title="عدد الأسئلة"
            value={contestSnap.contestCurrentIndex}
            suffix={` /${count}`}
            valueStyle={valueStyle}
          />
        </StyledCol>
      </Row>
    </PageHeader>
  );
};

export default ContestPageHeader;
