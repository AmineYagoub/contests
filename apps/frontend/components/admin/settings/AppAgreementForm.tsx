import { FormEvent, useEffect, useState } from 'react';
import { Form, Button, notification } from 'antd';
import { Jodit } from 'jodit';
import Head from 'next/head';
import { useUpdateAppConfigMutation } from '@/graphql/graphql';
import { useReactiveVar } from '@apollo/client';
import { appDataVar } from '@/utils/app';

const AppAgreementForm = () => {
  const [form] = Form.useForm();
  const siteData = useReactiveVar(appDataVar);
  const [content, setContent] = useState<string>('');
  const [UpdateAppConfigMutation, { loading }] = useUpdateAppConfigMutation();

  useEffect(() => {
    const editor = Jodit?.make('#editor', {
      height: 650,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    });
    editor.value = siteData?.agreement;
    editor.e.on('change', () => setContent(editor.value));
    return () => {
      editor.destruct();
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onFinish = async () => {
    try {
      const res = await UpdateAppConfigMutation({
        variables: {
          input: {
            agreement: content,
          },
        },
      });
      if (res) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث إتفاقية الإستخدام بنجاح`,
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: `حدث خطأ`,
        description: `حدث خطأ غير متوقع يرجى إعادة المحاولة`,
      });
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/jodit@3.23.2/build/jodit.es2018.min.css"
        />
      </Head>
      <h2 style={{ padding: '1em' }}>تعديل محتوى إتفاقية الإستخدام</h2>
      <Form
        wrapperCol={{ span: 18 }}
        form={form}
        size="large"
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        onSubmitCapture={onSubmit}
      >
        <Form.Item label="المحتوى" required name="agreement">
          <textarea id="editor" name="editor"></textarea>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '150px' }}
          loading={loading}
        >
          حفظ
        </Button>
      </Form>
    </>
  );
};

export default AppAgreementForm;
