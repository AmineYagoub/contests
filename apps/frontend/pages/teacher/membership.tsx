import SubscribeTeacherForm from '@/components/admin/users/SubscribeTeacherForm';
import MembershipDetails from '@/components/admin/users/MembershipDetails';
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
import { useSnapshot } from 'valtio';
import { SubscriptionPlanState } from '@/valtio/plans.state';

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
  const subscriptionSnap = useSnapshot(SubscriptionPlanState);
  const membership = subscriptionSnap.membershipData;
  const {
    data,
    error,
    methods,
    selectedPlan,
    personalImage,
    submitWait,
  } = useSubscriptionPlans();

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
        {!subscriptionSnap.queryLoading || data ? (
          data?.map((el: SubscriptionPlan, i) => (
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
                    <Title level={2} style={{ marginBottom: 0 }}>
                      {el.title}
                    </Title>
                    <Title
                      level={5}
                      mark={isCurrentPlan(el)}
                      type='secondary'
                      style={{ marginTop: 0 }}
                    >
                      {isCurrentPlan(el) ? 'الخطة الحالية' : el.subTitle}
                    </Title>
                  </Badge.Ribbon>
                ) : (
                  <>
                    <Title level={2} italic style={{ marginBottom: 0 }}>
                      {el.title}
                    </Title>
                    <Title
                      level={5}
                      mark={isCurrentPlan(el)}
                      type='secondary'
                      style={{ marginTop: 0 }}
                    >
                      {isCurrentPlan(el) ? 'الخطة الحالية' : el.subTitle}
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
                    ? methods.openMemberShipStatus()
                    : methods.openSubscriptionForm(el)
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
        onClose={methods.closeSubscriptionForm}
        plan={selectedPlan}
        error={error}
        onCloseMemberShip={methods.closeMemberShipStatus}
        submitSubscription={methods.submitSubscription}
        submitWait={submitWait}
        personalImage={personalImage}
      />
      <MembershipDetails
        onClose={methods.closeMemberShipStatus}
        personalImage={personalImage}
      />
    </>
  );
};

TeacherMembership.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default TeacherMembership;
