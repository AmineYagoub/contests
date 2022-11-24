import Head from 'next/head';

import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Button, Form, Input, notification, Result } from 'antd';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import HomeLayout from '@/layout/HomeLayout';
import { appDataVar, getTitleMeta } from '@/utils/app';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import styled from '@emotion/styled';
import { SendOutlined } from '@ant-design/icons';

const rules = [
  {
    required: true,
    message: 'هذا الحقل مطلوب',
  },
];

const StyledSection = styled('section')({
  textAlign: 'center',
  maxWidth: 550,
  margin: '0 auto',
});

export function ContactPage() {
  const siteData = useReactiveVar(appDataVar);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const router = useRouter();
  const user = useSnapshot(AuthState).user;

  const rootUrl = 'get from gonfig';

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const sendAgain = () => {
    setResult(false);
    form.resetFields();
  };

  const onFinish = async (inputs) => {
    try {
      /* setLoading(true);
      const data = await SendContactUsFormMutation({
        variables: {
          input: {
            to: siteData.contactEmail,
            ...inputs,
          },
        },
      });
      if (data) {
        setResult(true);
      } */
    } catch (error) {
      console.error(error);
      notification.error({
        message: `حدث خطأ`,
        description: `حدث خطأ غير متوقع يرجى إعادة المحاولة`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
      });
    }
  }, [user]);

  const itemJsonLd = () => {
    return {
      __html: `{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainContentOfPage": "${rootUrl}",
      }`,
    };
  };
  return (
    <StyledSection>
      <Head>
        <title>{getTitleMeta(siteData?.title, 'تواصل معنا')}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <h1 style={{ fontSize: '2rem', paddingBottom: 15 }}>تواصل معنا</h1>
      {!result ? (
        <Form
          form={form}
          size="large"
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          onSubmitCapture={onSubmit}
        >
          <Form.Item label="عنوان الرسالة" name="title" required rules={rules}>
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="بريدك الإلكتروني"
            name="email"
            required
            rules={rules}
          >
            <Input allowClear type="email" />
          </Form.Item>

          <Form.Item
            label="محتوى الرسالة"
            required
            rules={rules}
            name="content"
          >
            <Input.TextArea allowClear rows={10} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '150px' }}
            loading={loading}
            icon={<SendOutlined />}
          >
            أرسل
          </Button>
        </Form>
      ) : (
        <Result
          status="success"
          title="تم الإرسال بنجاح!"
          subTitle="تم إرسال رسالتك لإدارة الموقع, ستتلقى ردا من الإدارة خلال الساعات المقبلة."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => router.push('/')}
            >
              العودة للرئيسية
            </Button>,
            <Button key="buy" type="primary" ghost onClick={sendAgain}>
              أرسل رسالة أخرى
            </Button>,
          ]}
        />
      )}
    </StyledSection>
  );
}

ContactPage.getLayout = (page: EmotionJSX.Element) => (
  <HomeLayout>{page}</HomeLayout>
);
export default ContactPage;
