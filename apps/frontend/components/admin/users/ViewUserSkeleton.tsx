import styled from '@emotion/styled';
import { Col, Row, Skeleton, Space } from 'antd';

const StyledParagraph = styled(Skeleton)({
  li: {
    padding: '20px 0 !important',
  },
});

const ViewUserSkeleton = () => {
  return (
    <Row>
      <Col
        span={6}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Skeleton.Image active style={{ width: 200, height: 200 }} />
        <Space
          style={{
            margin: '20px auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Skeleton.Button active size="large" />
          <Skeleton.Button active size="large" />
        </Space>
      </Col>
      <Col span={18}>
        <StyledParagraph active />
        <StyledParagraph
          active
          style={{
            marginTop: 50,
          }}
        />
      </Col>
    </Row>
  );
};

export default ViewUserSkeleton;
