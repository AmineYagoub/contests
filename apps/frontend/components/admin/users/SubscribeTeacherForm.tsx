import { Alert, Button, Drawer, Typography } from 'antd';
import { SaveOutlined, WhatsAppOutlined } from '@ant-design/icons';

import { useCreateSubscriptionPlan } from '@/hooks/admin/manage-plans.hook';
import { SubscriptionPlan } from '@/graphql/graphql';

const { Title, Paragraph } = Typography;

const SubscribeTeacherForm = ({
  visible,
  plan,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  plan: SubscriptionPlan;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { onFinish, loading, error } = useCreateSubscriptionPlan({
    onClose,
    onSuccess,
  });
  return (
    <Drawer
      title='ترقية العضوية'
      placement='left'
      closable={false}
      onClose={onClose}
      open={visible}
      width={720}
      destroyOnClose
      extra={
        <Button onClick={onClose} htmlType='reset' type='primary' ghost>
          تراجع
        </Button>
      }
    >
      <Title level={1}>الإشتراك في الخطة ({plan?.title})</Title>
      <Paragraph>
        بعد تأكيد إشتراكك في العضوية المدفوعة و الحصول على وسام
        <b>(المعلم الذهبي )</b> ستظهر لك وسائل الدفع المتاحة على المنصة
      </Paragraph>
      <Title level={4}>ملاحظة مهمة جدا</Title>
      <Paragraph>
        بعد إتمام عملية الدفع أرسل صورة من رسالة التحويل مرفوقة بإسم عضويتك على
        المنصة على رقم الواتس آب التالي
      </Paragraph>
      <Button type='link' href='tel:00201096263877' icon={<WhatsAppOutlined />}>
        00201096263877
      </Button>
      <Button
        onClick={onFinish}
        type='primary'
        icon={<SaveOutlined />}
        htmlType='submit'
        form='create-question'
        loading={loading}
        size='large'
        block
        style={{
          maxWidth: 400,
          display: 'block',
          margin: '50px auto',
        }}
      >
        تأكيد الإشتراك
      </Button>
      {error && (
        <Alert
          message='خطأ'
          description='حدث خطأ أثناء عملية ترقية العضوية ، يرجى المحاولة مرة أخرى'
          banner
          closable
          type='error'
          showIcon
        />
      )}
    </Drawer>
  );
};

export default SubscribeTeacherForm;
