import { FormEvent, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { appDataVar, Logger } from '@/utils/app';
import { Form, Input, Button, notification } from 'antd';
import {
  App,
  UpdateAppConfigDto,
  useUpdateAppConfigMutation,
} from '@/graphql/graphql';

const AppSettingsForm = () => {
  const [form] = Form.useForm();
  const siteData = useReactiveVar(appDataVar);
  const [UpdateAppConfigMutation, { loading }] = useUpdateAppConfigMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (siteData) {
      form.setFieldsValue(siteData);
    }
  }, [siteData, form]);

  const onFinish = async (inputs: UpdateAppConfigDto) => {
    try {
      const { data } = await UpdateAppConfigMutation({
        variables: {
          input: inputs,
        },
      });
      appDataVar(data?.updateAppConfig as App);
      if (data) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث الإعدادات العامة للموقع بنجاح`,
        });
      }
    } catch (error) {
      Logger.log(error);
      notification.error({
        message: `حدث خطأ`,
        description: `حدث خطأ غير متوقع يرجى إعادة المحاولة`,
      });
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
          <Input />
        </Form.Item>

        <Form.Item label="وصف الموقع" required name="description">
          <Input.TextArea />
        </Form.Item>

        <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
          بيانات التواصل
        </h2>
        <Form.Item
          label="البريد الإلكتروني المستخدم في صفحة تواصل معنا"
          name="contactEmail"
          required
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item label="رابط صفحة الموقع على تويتر" name="twitterUrl">
          <Input placeholder="https://twitter.com/username" />
        </Form.Item>

        <Form.Item label="رابط صفحة الموقع على أنستغرام" name="instagramUrl">
          <Input placeholder="https://instagram.com/username" />
        </Form.Item>

        <Form.Item label="رابط قناة الموقع على يوتيوب" name="youtubeUrl">
          <Input placeholder="https://youtube.com/channel/username" />
        </Form.Item>
        <Form.Item label="رابط صفحة الموقع على فايسبوك" name="facebookUrl">
          <Input placeholder="https://www.facebook.com/add/username" />
        </Form.Item>

        <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
          تطبيقات الهاتف
        </h2>
        <Form.Item label="رابط تطبيق الموقع على غوغل بلاي" name="playStorUrl">
          <Input placeholder="https://play.google.com/xxx" />
        </Form.Item>
        <Form.Item label="رابط تطبيق الموقع على آب ستور" name="appStorUrl">
          <Input placeholder="https://apps.apple.com/xxx" />
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
