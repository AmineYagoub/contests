import { CaretRightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Alert, Collapse } from 'antd';
import { ResultType } from '@/utils/types';

const { Panel } = Collapse;

const StyledPanel = styled(Panel)((props) => ({
  backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
}));

const StyledAlert = styled(Alert)({
  width: 450,
  margin: '10px 5px !important',
  boxShadow:
    ' rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
});

const AnswersResult = ({ results }: { results: ResultType[] }) => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {results.map((el) => (
        <StyledPanel header={el.title} key={el.questionId}>
          {el.options.map((opt, i) => (
            <StyledAlert
              key={i}
              description={opt}
              type={el.correctAnswer === opt.trim() ? 'success' : 'info'}
              showIcon
            />
          ))}
        </StyledPanel>
      ))}
    </Collapse>
  );
};

export default AnswersResult;
