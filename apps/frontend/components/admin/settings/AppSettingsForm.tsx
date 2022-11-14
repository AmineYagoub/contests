import React, { FormEvent, useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';

const AppSettingsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    form.setFieldsValue({});
  }, []);

  const onFinish = async (inputs) => {
    try {
      /* setLoading(true);
      const { data } = await UpdateAppDataMutation({
        variables: {
          input: inputs,
        },
      });
      appDataVar(data?.updateAppData);
      if (data) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث الإعدادات العامة للموقع بنجاح`,
        });
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
  return (
    <>
      <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
        الإعدادات العامة
      </h2>
      <Form
        wrapperCol={{ span: 18 }}
        form={form}
        size="large"
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        onSubmitCapture={onSubmit}
      >
        <Form.Item label="إسم الموقع" name="title" required>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="وصف الموقع" required name="description">
          <Input.TextArea allowClear />
        </Form.Item>

        <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
          بيانات التواصل
        </h2>
        <Form.Item
          label="البريد الإلكتروني المستخدم في صفحة تواصل معنا"
          name="contactEmail"
          required
        >
          <Input allowClear type="email" />
        </Form.Item>

        <Form.Item label="رابط صفحة الموقع على تويتر" name="twitterUrl">
          <Input allowClear placeholder="https://twitter.com/username" />
        </Form.Item>

        <Form.Item label="رابط صفحة الموقع على أنستغرام" name="instagramUrl">
          <Input allowClear placeholder="https://instagram.com/username" />
        </Form.Item>

        <Form.Item label="رابط صفحة الموقع على تلغرام" name="telegramUrl">
          <Input allowClear placeholder="https://t.me/username" />
        </Form.Item>
        <Form.Item label="رابط صفحة الموقع على فايسبوك" name="facebookUrl">
          <Input
            allowClear
            placeholder="https://www.facebook.com/add/username"
          />
        </Form.Item>

        <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
          تطبيقات الهاتف
        </h2>
        <Form.Item label="رابط تطبيق الموقع على غوغل بلاي" name="playStorUrl">
          <Input allowClear placeholder="https://play.google.com/xxx" />
        </Form.Item>
        <Form.Item label="رابط تطبيق الموقع على آب ستور" name="appStorUrl">
          <Input allowClear placeholder="https://apps.apple.com/xxx" />
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

export default AppSettingsForm;
