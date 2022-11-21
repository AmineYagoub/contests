import { Alert, Button, Drawer, Typography } from 'antd';
import { SendOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { SubscriptionPlan } from '@/graphql/graphql';
import MembershipDetails from './MembershipDetails';
import { useSnapshot } from 'valtio';
import { SubscriptionPlanState } from '@/valtio/plans.state';
import { ApolloError } from '@apollo/client';

const { Title, Paragraph } = Typography;

const SubscribeTeacherForm = ({
  error,
  plan,
  onClose,
  onCloseMemberShip,
  submitSubscription,
  submitWait,
  personalImage,
}: {
  plan: SubscriptionPlan;
  onClose: () => void;
  onCloseMemberShip: () => void;
  error: ApolloError;
  submitSubscription: (e: SubscriptionPlan) => void;
  submitWait: boolean;
  personalImage: string;
}) => {
  const subscriptionSnap = useSnapshot(SubscriptionPlanState);
  return (
    <Drawer
      title='ترقية العضوية'
      placement='left'
      closable={false}
      onClose={onClose}
      open={subscriptionSnap.subscriptionForm}
      width={720}
      destroyOnClose
      extra={
        <Button onClick={onClose} htmlType='reset' type='primary' ghost>
          إغلاق
        </Button>
      }
    >
      <Title level={1}>الإشتراك في الخطة ({plan?.title})</Title>
      <Paragraph>
        بعد تأكيد إشتراكك في العضوية المدفوعة و الحصول على وسام
        <b> (المعلم الذهبي )</b> ستظهر لك وسائل الدفع المتاحة على المنصة
      </Paragraph>
      <Title level={4}>ملاحظة مهمة جدا</Title>
      <Paragraph mark>
        بعد إتمام عملية الدفع أرسل صورة من رسالة التحويل مرفوقة بإسم عضويتك على
        المنصة على رقم الواتس آب التالي
      </Paragraph>
      <Button
        type='link'
        href='tel:00201096263877'
        icon={<WhatsAppOutlined />}
        size='large'
      >
        00201096263877
      </Button>
      <Button
        onClick={() => submitSubscription(plan)}
        type='primary'
        icon={<SendOutlined />}
        htmlType='submit'
        form='create-question'
        loading={submitWait}
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

      <MembershipDetails
        onClose={onCloseMemberShip}
        personalImage={personalImage}
      />
    </Drawer>
  );
};

export default SubscribeTeacherForm;
