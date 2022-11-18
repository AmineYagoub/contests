import SubscribeTeacherForm from '@/components/admin/users/SubscribeTeacherForm';
import SubscriptionDetails from '@/components/admin/users/SubscriptionDetails';
import Loading from '@/components/common/Loading';
import StyledButton from '@/components/common/StyledButton';
import { Membership, SubscriptionPlan } from '@/graphql/graphql';
import { useSubscriptionPlans } from '@/hooks/subscription/plans';
import ProfileLayout from '@/layout/ProfileLayout';
import { formatPrice } from '@/utils/app';
import { CheckOutlined } from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Card, Divider, Space, Badge, Typography } from 'antd';
import { useState } from 'react';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  boxShadow: 'none',
};

const { Paragraph, Title, Text } = Typography;

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: '0 5px',
  marginTop: 35,
  fontSize: '1rem',
  textAlign: 'left',
  li: {
    padding: 5,
    fontSize: 'small',
    ['.anticon-check']: {
      marginRight: 5,
      color: 'green',
    },
  },
});

const getPriceByLabel = (period: number) =>
  period === 30 ? '/ الشهر' : period > 30 && period < 400 ? '/ السنة' : '';

const TeacherMembership = () => {
  const { data, membership, personalImage } = useSubscriptionPlans();

  console.log(membership);

  const [subscriptionDetailsVisible, setSubscriptionDetailsVisible] = useState(
    false
  );
  const [subscriptionFormVisible, setSubscriptionFormVisible] = useState(false);
  const [plan, setPlan] = useState<SubscriptionPlan>(null);

  const showSubscriptionForm = (el: SubscriptionPlan) => {
    setSubscriptionFormVisible(true);
    setPlan(el);
  };
  const showSubscriptionDetails = () => {
    setSubscriptionDetailsVisible(true);
  };
  const closeSubscriptionDetails = () => {
    setSubscriptionDetailsVisible(false);
  };

  const closeSubscriptionForm = () => {
    setSubscriptionFormVisible(false);
    setPlan(null);
  };

  const isFreePlan = (el: SubscriptionPlan) =>
    membership === null && el.price === 0;

  const isCurrentPlan = (el: SubscriptionPlan) =>
    isFreePlan(el) || el.title === membership?.memberShipOn.title;

  return (
    <>
      <Title level={3}>الإشتراك المدفوع</Title>
      <Paragraph type='secondary'>
        إشترك في أحد الخطط المدفوعة لترقية عضويتك و الحصول على مزايا إضافية.
      </Paragraph>
      <Divider />

      <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
        {data ? (
          data.findAllSubscriptionPlans.map((el: SubscriptionPlan, i) => (
            <Card.Grid
              key={el.id}
              style={{
                ...gridStyle,
                opacity: isCurrentPlan(el) || !membership ? 1 : 0.5,
                boxShadow: isCurrentPlan(el)
                  ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                  : 'none',
              }}
            >
              {
                // TODO create popular plan computation
                i === 2 ? (
                  <Badge.Ribbon text='الأكثر طلبا' color='green'>
                    <Title level={2}>{el.title}</Title>
                    <Title level={5} mark={isCurrentPlan(el)}>
                      الخطة الحالية
                    </Title>
                  </Badge.Ribbon>
                ) : (
                  <>
                    <Title level={2} italic>
                      {el.title}
                    </Title>
                    <Title level={5} mark={isCurrentPlan(el)}>
                      الخطة الحالية
                    </Title>
                  </>
                )
              }
              <Space align='baseline'>
                <Title level={2} type='success'>
                  {formatPrice(el.price)}
                </Title>
                <Text>{getPriceByLabel(el.period)}</Text>
              </Space>
              <StyledButton
                type='primary'
                block
                shape='round'
                onClick={() =>
                  isCurrentPlan(el)
                    ? showSubscriptionDetails()
                    : showSubscriptionForm(el)
                }
                disabled={
                  isFreePlan(el)
                    ? true
                    : !membership
                    ? false
                    : !isCurrentPlan(el)
                }
              >
                {isCurrentPlan(el) ? 'حالة الإشتراك' : 'إشترك'}
              </StyledButton>
              <StyledList>
                {el.options.map((opt) => (
                  <li key={opt}>
                    <CheckOutlined /> <Text>{opt}</Text>
                  </li>
                ))}
                <li>
                  <CheckOutlined />
                  <Text>
                    {el.allowedContests === -1
                      ? ' إنشاء مسابقات غير محدود'
                      : `${el.allowedContests} مسابقة كل شهر`}
                  </Text>
                </li>
              </StyledList>
            </Card.Grid>
          ))
        ) : (
          <Loading />
        )}
      </Card>
      <SubscribeTeacherForm
        visible={subscriptionFormVisible}
        plan={plan}
        onClose={closeSubscriptionForm}
      />
      <SubscriptionDetails
        visible={subscriptionDetailsVisible}
        onClose={closeSubscriptionDetails}
        membership={membership as Membership}
        personalImage={personalImage}
      />
    </>
  );
};

TeacherMembership.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default TeacherMembership;
