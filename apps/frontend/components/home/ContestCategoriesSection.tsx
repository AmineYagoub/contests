import styled from '@emotion/styled';
import { Topic } from '@/graphql/graphql';
import { title } from './HowItWorkSection';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

export const StyledSection = styled(Row)({
  justifyContent: 'space-around',
  textAlign: 'center',
  maxWidth: 1380,
  margin: '2em auto 5em auto',
  h2: {
    fontSize: '2.5rem !important',
    ...title,
    width: '100%',
  },
});

const StyledCol = styled(Col)({
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset !important',
  borderRadius: 5,
  height: 150,
  minWidth: 180,
  display: 'flex !important',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(#DEE0EE ,#C8C8C8)',

  margin: 5,
  h4: {
    fontSize: '2rem !important',
    textShadow: '0px 2px 2px rgba(16, 128, 109, 1)',
    color: 'purple !important',
  },
});

const ContestCategoriesSection = ({
  topics,
  length,
}: {
  topics: Topic[];
  length: number;
}) => {
  return (
    <StyledSection wrap>
      <Title level={2}>مواضيع المسابقات</Title>
      {topics.map((topic) => (
        <StyledCol span={3} key={topic.id} className="koufi">
          <h4>{topic.title}</h4>
        </StyledCol>
      ))}
      <span
        style={{ width: 200, marginTop: 35, fontSize: '1.5rem' }}
        className="koufi"
      >
        أكثر من {length} موضوعاً
      </span>
    </StyledSection>
  );
};

export default ContestCategoriesSection;
