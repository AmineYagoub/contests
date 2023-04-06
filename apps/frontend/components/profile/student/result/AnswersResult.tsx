import { Alert, Collapse } from 'antd';

import { ResultType } from '@/utils/types';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import { RoleTitle } from '@/graphql/graphql';

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

const StyledLesson = styled(Alert)({
  backgroundColor: '#d6effa !important',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  ['.anticon']: {
    color: '#1890ff !important',
  },
});

const AnswersResult = ({ results }: { results: ResultType[] }) => {
  const user = useSnapshot(AuthState).user;
  const collapsible = [RoleTitle.GoldenTeacher, RoleTitle.Teacher].includes(
    user?.role.title
  )
    ? 'disabled'
    : 'header';
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {results.map((el) => (
        <StyledPanel
          header={<pre>{el.title}</pre>}
          key={el.questionId}
          collapsible={collapsible}
        >
          {el.options.map(
            (opt, i) =>
              opt !== 'empty' && (
                <StyledAlert
                  key={i}
                  description={opt}
                  type={
                    el.correctAnswer === opt.trim()
                      ? 'success'
                      : el.selectedOption === opt.trim() &&
                        el.correctAnswer !== opt.trim()
                      ? 'error'
                      : 'info'
                  }
                  showIcon
                />
              )
          )}
          <StyledLesson
            message="الدرس المستفاد"
            description={el.lesson}
            type="info"
            showIcon
          />
        </StyledPanel>
      ))}
    </Collapse>
  );
};

export default AnswersResult;
