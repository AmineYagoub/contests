import { Button, Col, PageHeader, Row, Space, Statistic, Tag } from 'antd';
import Link from 'next/link';

import { AppRoutes } from '@/config/routes';
import theme from '@/config/theme';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { getMapperLabel, studentMappedLevels } from '@/utils/mapper';
import { ContestState } from '@/valtio/contest.state';
import { useSnapshot } from 'valtio';

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
    boxShadow: ' 0 0 20px #eee',
  },
});

const deadline = (target: number) => Date.now() + 1000 * 60 * target + 1000;

const ContestPageHeader = () => {
  const contestSnap = useSnapshot(ContestState);
  if (!contestSnap.contest) {
    return;
  }
  const { easyQuestionCount, mediumQuestionCount, hardQuestionCount } =
    contestSnap.contest;
  const count = easyQuestionCount + mediumQuestionCount + hardQuestionCount;
  return (
    <PageHeader
      onBack={() => null}
      title={<Link href={AppRoutes.Home}>{`الرئيسية`}</Link>}
      subTitle={contestSnap.contest.title}
      style={{ backgroundColor: theme.successColor }}
      extra={
        <StyledNavigationBtn>
          <Button
            icon={<RightOutlined />}
            shape="circle"
            size="large"
            disabled={!contestSnap.contestFinished}
          />
          <strong>تصفح الأسئلة</strong>
          <Button
            icon={<LeftOutlined />}
            shape="circle"
            size="large"
            disabled={contestSnap.contestCurrentIndex <= 0}
          />
        </StyledNavigationBtn>
      }
    >
      <Row justify="center">
        <StyledCol span={6}>
          <StyledStatLevels
            title="مستوى المسابقة"
            value=""
            suffix={contestSnap.contest.level.map((el) => (
              <Tag key={el} color="blue">
                {getMapperLabel(studentMappedLevels, el)}
              </Tag>
            ))}
          />
        </StyledCol>
        <StyledCol span={6}>
          {contestSnap.contestStarted ? (
            <StyledCountdown
              title="الوقت المتبقي"
              value={deadline(contestSnap.contest.duration)}
              format="HH:mm:ss"
            />
          ) : (
            <StyledStat
              title="زمن المسابقة"
              value={contestSnap.contest.duration}
              suffix="دقيقة"
              valueStyle={{ color: theme.primaryColor }}
            />
          )}
        </StyledCol>
        <StyledCol span={6}>
          <StyledStat
            title="عدد الأسئلة"
            value={contestSnap.contestCurrentIndex}
            suffix={` /${count}`}
            valueStyle={{ color: theme.primaryColor }}
          />
        </StyledCol>
      </Row>
    </PageHeader>
  );
};

export default ContestPageHeader;
