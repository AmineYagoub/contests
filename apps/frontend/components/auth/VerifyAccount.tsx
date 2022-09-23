import { Badge, Button, Divider, Progress } from 'antd';
import { motion } from 'framer-motion';
import { FormEvent, ReactElement, useEffect, useState } from 'react';

import theme from '@/config/theme';
import { MailOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledMailOutlined = styled(MailOutlined)({
  fontSize: '5rem',
  height: '100px',
  color: `${theme.primaryColor} !important`,
});

const StyledSection = styled('section')({
  maxWidth: 600,
  margin: '0 auto',
  textAlign: 'center',
  h2: {
    fontSize: '1.8rem',
    margin: '10px 0',
  },
});

const VerifyAccount = ({
  email,
  isSuccess,
}: {
  email: string;
  isSuccess: boolean;
}): ReactElement => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => p + 1);
    }, 1000);
    if (!isSuccess) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSuccess]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      exit={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 100,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Badge count={1} size="default">
          <StyledMailOutlined />
        </Badge>
      </div>

      <StyledSection>
        <h2>خطوة واحدة فقط لتصبح جزءا من مجتمعنا &#127881; </h2>
        <h3>
          تفقد بريدك الإلكتروني (<a href={`mailto:${email}`}>{email}</a> )
          للإطلاع على تفاصيل تفعيل حسابك
        </h3>
        <Divider />
        <h4>لم يصلك رمز التفعيل؟</h4>
        {progress <= 100 && isSuccess ? (
          <Progress
            strokeColor={{
              from: '#e400dd',
              to: '#e400dd',
            }}
            type="circle"
            width={80}
            percent={progress}
            format={(percent) => percent}
          />
        ) : message ? (
          <span>{message}</span>
        ) : (
          <Button type="primary" size="large" ghost loading={isLoading}>
            أعد إرسال رمز التفعيل
          </Button>
        )}
      </StyledSection>
    </motion.div>
  );
};

export default VerifyAccount;
