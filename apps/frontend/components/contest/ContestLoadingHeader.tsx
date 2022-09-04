import theme from '@/config/theme';
import { PageHeader, Row, Skeleton } from 'antd';
import { StyledCol } from './ContestPageHeader';

const ContestLoadingHeader = () => {
  return (
    <PageHeader
      onBack={() => null}
      title={<Skeleton.Input active />}
      subTitle={<Skeleton.Input active />}
      style={{ backgroundColor: theme.successColor }}
    >
      <Row justify="center">
        <StyledCol span={6}>{<Skeleton.Input active />}</StyledCol>
        <StyledCol span={6}>{<Skeleton.Input active />}</StyledCol>
        <StyledCol span={6}>{<Skeleton.Input active />}</StyledCol>
      </Row>
    </PageHeader>
  );
};

export default ContestLoadingHeader;
