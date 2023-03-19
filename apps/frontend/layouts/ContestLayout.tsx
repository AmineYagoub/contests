import { Layout } from 'antd';
import styled from '@emotion/styled';
import ContestPageHeader from '@/components/contest/ContestPageHeader';

const { Content } = Layout;

const StyledContent = styled(Content)({
  width: '65% !important',
  backgroundColor: '#ffffff21',
  color: '#ffffff',
  textAlign: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  maxHeight: '600px !important',
});

const StyledLayout = styled(Layout)({
  backgroundImage: 'url("/img/contest-bg.jpg") !important',
  backgroundSize: 'cover !important',
  perspective: 700,
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const ContestLayout = ({ children }) => {
  return (
    <StyledLayout>
      {/* {loading ? <ContestLoadingHeader /> : <ContestPageHeader />} */}
      <ContestPageHeader />
      <StyledContent>
        {/* {loading ? <Spin size="large" /> : children} */}
        {children}
      </StyledContent>
    </StyledLayout>
  );
};

export default ContestLayout;
