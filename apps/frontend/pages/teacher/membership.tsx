import SubscribeTeacherForm from '@/components/admin/users/SubscribeTeacherForm';
import Loading from '@/components/common/Loading';
import StyledButton from '@/components/common/StyledButton';
import { SubscriptionPlan } from '@/graphql/graphql';
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

const StyledH1 = styled('h1')({
  fontSize: '2rem',
});

const { Paragraph } = Typography;

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

const TeacherMembership = () => {
  const { data, refetch } = useSubscriptionPlans();
  const [visible, setVisible] = useState(false);
  const [plan, setPlan] = useState<SubscriptionPlan>(null);

  const showDrawer = (el: SubscriptionPlan) => {
    setVisible(true);
    setPlan(el);
  };
  const onClose = () => {
    setVisible(false);
    setPlan(null);
  };
  return (
    <>
      <StyledH1>الإشتراك المدفوع</StyledH1>
      <Paragraph type='secondary'>
        إشترك في أحد الخطط المدفوعة لترقية عضويتك و الحصول على مزايا إضافية.
      </Paragraph>
      <Divider />

      <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
        {data ? (
          data.findAllSubscriptionPlans.map((el, i) => (
            <Card.Grid
              key={el.id}
              style={{
                ...gridStyle,
                // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', CURRENT PLAN
              }}
            >
              {
                // TODO create popular plan computation
                i === 2 ? (
                  <Badge.Ribbon text='الأكثر طلبا' color='green'>
                    <StyledH1>{el.title}</StyledH1>
                    <h3>{el.subTitle}</h3>
                  </Badge.Ribbon>
                ) : (
                  <>
                    <StyledH1>{el.title}</StyledH1>
                    <h3>{el.subTitle}</h3>
                  </>
                )
              }
              <Space>
                <StyledH1>{formatPrice(el.price)}</StyledH1>
                <span>/ الشهر</span>
              </Space>
              <StyledButton
                type='primary'
                block
                shape='round'
                onClick={() => showDrawer(el)}
              >
                إشترك
              </StyledButton>
              <StyledList>
                {el.options.map((opt) => (
                  <li key={opt}>
                    <CheckOutlined /> <span>{opt}</span>
                  </li>
                ))}
                <li>
                  <CheckOutlined />
                  {el.allowedContests === -1 ? (
                    <span>إنشاء مسابقات غير محدود</span>
                  ) : (
                    <span>{el.allowedContests} مسابقة كل شهر</span>
                  )}
                </li>
              </StyledList>
            </Card.Grid>
          ))
        ) : (
          <Loading />
        )}
      </Card>
      <SubscribeTeacherForm
        visible={visible}
        plan={plan}
        onClose={onClose}
        onSuccess={() => refetch()}
      />
    </>
  );
};

TeacherMembership.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default TeacherMembership;
