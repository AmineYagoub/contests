import styled from '@emotion/styled';
import { Layout } from 'antd';
import React from 'react';

const { Footer } = Layout;

export const Copyright = () => (
  <>
    <small>
      &copy; جميع الحقوق محفوظة لمنصة مسابقات {new Date().getFullYear()}
    </small>
    <br />
    <small>
      أي علامات تجارية أو شعارات مستخدمة في هذا الموقع هي ملك لأصحابها.
    </small>
  </>
);

const NewFooter = styled(Footer)({
  textAlign: 'center',
  padding: '11px 50px !important',
});

const StyledFooter = () => {
  return (
    <NewFooter>
      <Copyright />
    </NewFooter>
  );
};

export default StyledFooter;
