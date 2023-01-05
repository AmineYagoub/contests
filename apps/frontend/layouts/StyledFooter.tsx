import { Col, Layout, Row, Space } from 'antd';

import styled from '@emotion/styled';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
import { appDataVar } from '@/utils/app';

const { Footer } = Layout;

export const Copyright = () => (
  <>
    <small>
      &copy; جميع الحقوق محفوظة لمنصة أولمبياد النحو العربي{' '}
      {new Date().getFullYear()}
    </small>
    <br />
    <small>
      أي علامات تجارية أو شعارات مستخدمة في هذا الموقع هي ملك لأصحابها.
    </small>
  </>
);

const NewFooter = styled(Footer)({
  padding: '11px 50px !important',
});

const StyledFooter = () => {
  const siteData = useReactiveVar(appDataVar);
  return (
    <NewFooter>
      <Row justify="space-between" align="middle">
        <Col span={6}>
          <Space>
            <a href={siteData.facebookUrl} target="_blank" rel="noreferrer">
              <Image
                src="/icons/social/facebook.png"
                width={32}
                height={32}
                alt="follow us on facebook"
              />
            </a>
            <a href={siteData.twitterUrl} target="_blank" rel="noreferrer">
              <Image
                src="/icons/social/twitter.png"
                width={32}
                height={32}
                alt="follow us on twitter"
              />
            </a>
            <a href={siteData.instagramUrl} target="_blank" rel="noreferrer">
              <Image
                src="/icons/social/instagram.png"
                width={32}
                height={32}
                alt="follow us on instagram"
              />
            </a>
            <a href={siteData.youtubeUrl} target="_blank" rel="noreferrer">
              <Image
                src="/icons/social/youtube.png"
                width={32}
                height={32}
                alt="follow us on youtube"
              />
            </a>
          </Space>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <Copyright />
        </Col>
        <Col span={6}></Col>
      </Row>
    </NewFooter>
  );
};

export default StyledFooter;
