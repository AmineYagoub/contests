import { Membership } from '@/graphql/graphql';
import styled from '@emotion/styled';
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Image,
  List,
  Row,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';
import StyledButton from '@/components/common/StyledButton';
import { getMapperLabel, membershipStatusMappedTypes } from '@/utils/mapper';
import moment from 'moment-timezone';

const { Item } = List;

const StyledItem = styled(Item)({
  justifyContent: 'start !important',
  gap: 20,
  '& .ant-typography': {
    width: 80,
    '&::after': {
      content: '":"',
    },
  },
});

const SubscriptionDetails = ({
  visible,
  onClose,
  membership,
  personalImage,
}: {
  visible: boolean;
  onClose: () => void;
  membership: Membership;
  personalImage: string;
}) => {
  return (
    <Drawer
      title='إشتراك العضوية الذهبية'
      placement='left'
      width={600}
      destroyOnClose
      extra={
        <Button onClick={onClose} htmlType='reset' type='primary' ghost>
          إغلاق
        </Button>
      }
      closable={false}
      onClose={onClose}
      open={visible}
    >
      {membership && (
        <Row justify='space-between'>
          <Col
            span={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image src={personalImage} alt='avatar' width={150} height={150} />
          </Col>
          <Col span={14}>
            <List header={<h2>حالة إشتراكي</h2>}>
              <StyledItem>
                <Typography.Text strong>نوع العضوية</Typography.Text>
                <Tag
                  color={membership.memberShipOn.price > 0 ? 'green' : 'blue'}
                >
                  {membership.memberShipOn.price > 0
                    ? 'العضوية الذهبية'
                    : 'العضوية المجانية'}
                </Tag>
              </StyledItem>

              <StyledItem>
                <Typography.Text strong>خطة الإشتراك</Typography.Text>
                <span>{membership.memberShipOn.title}</span>
              </StyledItem>

              <StyledItem>
                <Typography.Text strong>حالة الإشتراك</Typography.Text>
                <Tag
                  color={membership.memberShipOn.price > 0 ? 'gold' : 'green'}
                >
                  {getMapperLabel(
                    membershipStatusMappedTypes,
                    membership.status
                  )}
                </Tag>
              </StyledItem>

              <StyledItem>
                <Typography.Text strong>بداية الإشتراك</Typography.Text>
                {membership.startDate ? (
                  <span>{moment(membership.startDate).fromNow()}</span>
                ) : (
                  <Tag
                    color={membership.memberShipOn.price > 0 ? 'gold' : 'green'}
                  >
                    {getMapperLabel(
                      membershipStatusMappedTypes,
                      membership.status
                    )}
                  </Tag>
                )}
              </StyledItem>
              <StyledItem>
                <Typography.Text strong>نهاية الإشتراك</Typography.Text>
                {membership.endDate ? (
                  <span>{moment(membership.endDate).fromNow()}</span>
                ) : (
                  <Tag
                    color={membership.memberShipOn.price > 0 ? 'gold' : 'green'}
                  >
                    {getMapperLabel(
                      membershipStatusMappedTypes,
                      membership.status
                    )}
                  </Tag>
                )}
              </StyledItem>
            </List>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default SubscriptionDetails;
