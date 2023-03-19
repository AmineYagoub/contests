import styled from '@emotion/styled';
import { Button } from 'antd';

const StyledButton = styled(Button)((props) => {
  const color =
    props.color === 'danger'
      ? 'var(--ant-error-color)'
      : 'var(--ant-primary-color)';
  const shadow =
    props.color === 'danger'
      ? `${color} 0px 3px 12px -3px, ${color} 0px 4px 16px -8px !important`
      : `${color} 0px 13px 27px -5px, ${color} 0px 8px 16px -8px !important`;
  return {
    boxShadow: shadow,
    transition: 'all 0.2s ease 0s',
    [' &:hover']: {
      transform: ' translateY(-2px)',
    },
  };
});

export default StyledButton;
