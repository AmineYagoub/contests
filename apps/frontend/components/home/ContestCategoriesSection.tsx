import styled from '@emotion/styled';
import { Col, Row, Typography } from 'antd';
import StyledButton from '../common/StyledButton';
import { title } from './HowItWorkSection';

const { Title } = Typography;

export const StyledSection = styled(Row)({
  justifyContent: 'space-around',
  textAlign: 'center',
  h2: {
    fontSize: '3.5rem !important',
    ...title,
    width: '100%',
  },
});

const StyledCol = styled(Col)({
  boxShadow:
    'var(--ant-primary-color) 0px 13px 27px -5px, var(--ant-primary-color) 0px 8px 16px -8px !important',
  borderRadius: 5,
  height: 150,
});

const ContestCategoriesSection = () => {
  return (
    <StyledSection>
      <Title level={2}>مواضيع المسابقات</Title>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledCol span={3}>1</StyledCol>
      <StyledButton
        size="large"
        type="primary"
        shape="round"
        style={{ width: 200, marginTop: 35 }}
      >
        شاهد كل المواضيع
      </StyledButton>
    </StyledSection>
  );
};

export default ContestCategoriesSection;
