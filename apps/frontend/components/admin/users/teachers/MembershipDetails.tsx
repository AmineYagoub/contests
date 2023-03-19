import { Button, Col, Drawer, Row } from 'antd';
import PaymentDetails from './PaymentDetails';
import MembershipData from './MembershipData';
import { useSnapshot } from 'valtio';
import { SubscriptionPlanState } from '@/valtio/plans.state';
import Image from 'next/image';

const MembershipDetails = ({
  onClose,
  personalImage,
}: {
  onClose: () => void;
  personalImage: string;
}) => {
  const subscriptionSnap = useSnapshot(SubscriptionPlanState);
  const membership = subscriptionSnap.membershipData;
  return (
    <Drawer
      title="إشتراك العضوية الذهبية"
      placement="left"
      width={600}
      destroyOnClose
      extra={
        <Button onClick={onClose} htmlType="reset" type="primary" ghost>
          إغلاق
        </Button>
      }
      closable={false}
      onClose={onClose}
      open={subscriptionSnap.membershipDetails}
    >
      {membership && (
        <Row justify="space-between">
          <Col
            span={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image src={personalImage} alt="avatar" width={150} height={150} />
          </Col>
          <Col span={14}>
            <MembershipData title="حالة إشتراكي" />
          </Col>
        </Row>
      )}
      <PaymentDetails />
    </Drawer>
  );
};

export default MembershipDetails;
