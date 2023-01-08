import { FormEvent, useEffect, useState } from 'react';
import { Form, Button, notification } from 'antd';
import { Jodit } from 'jodit';
import Head from 'next/head';
import {
  useFindAboutUsPageQuery,
  useUpdateAppConfigMutation,
} from '@/graphql/graphql';
import Loading from '@/components/common/Loading';

const AppAboutUsForm = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>('');
  const [UpdateAppConfigMutation, { loading }] = useUpdateAppConfigMutation();
  const { data, loading: loadData } = useFindAboutUsPageQuery();

  useEffect(() => {
    if (data) {
      const editor = Jodit?.make('#editor', {
        height: 650,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
      });
      editor.value = data?.findAppConfig.aboutUs;
      editor.e.on('change', () => setContent(editor.value));
      return () => {
        editor.destruct();
      };
    }
  }, [data]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onFinish = async () => {
    try {
      const res = await UpdateAppConfigMutation({
        variables: {
          input: {
            aboutUs: content,
          },
        },
      });
      if (res) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث المحتوى بنجاح`,
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
      <h2 style={{ padding: '1em' }}>تعديل محتوى صفحة حول الموقع</h2>
      {loadData ? (
        <Loading />
      ) : (
        <Form
          wrapperCol={{ span: 18 }}
          form={form}
          size="large"
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          onSubmitCapture={onSubmit}
        >
          <Form.Item label="المحتوى" required name="aboutUs">
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
      )}
    </>
  );
};

export default AppAboutUsForm;
