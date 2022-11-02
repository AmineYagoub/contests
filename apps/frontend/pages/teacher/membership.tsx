import StyledButton from '@/components/common/StyledButton';
import ProfileLayout from '@/layout/ProfileLayout';
import { CheckOutlined } from '@ant-design/icons';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Card, Divider, Space, Badge, Typography } from 'antd';

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
  marginTop: 35,
  fontSize: '1rem',
  textAlign: 'left',
  li: {
    padding: 5,
    ['.anticon-check']: {
      marginRight: 5,
      color: 'green',
    },
  },
});

const TeacherMembership = () => {
  return (
    <>
      <StyledH1>الإشتراك المدفوع</StyledH1>
      <Paragraph type="secondary">
        إشترك في أحد الخطط المدفوعة لترقية عضويتك و الحصول على مزايا إضافية.
      </Paragraph>
      <Divider />

      <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
        <Card.Grid
          style={{
            ...gridStyle,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
        >
          <StyledH1>المجاني</StyledH1>
          <h3>الخطة المجانية</h3>
          <Space>
            <StyledH1>$0</StyledH1>
            <span>/ الشهر</span>
          </Space>
          <StyledButton type="primary" ghost block shape="round">
            الحالية
          </StyledButton>
          <StyledList>
            <li>
              <CheckOutlined /> <span>الإشراف على الطلبة</span>
            </li>
            <li>
              <CheckOutlined /> <span>إرسال و إستقبال الرسائل</span>
            </li>
          </StyledList>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StyledH1>الشهري</StyledH1>
          <h3>الدفع كل شهر</h3>
          <Space>
            <StyledH1>$2.50</StyledH1>
            <span>/ الشهر</span>
          </Space>
          <StyledButton type="primary" block shape="round">
            إشترك
          </StyledButton>
          <StyledList>
            <li>
              <CheckOutlined /> <span>الإشراف على الطلبة</span>
            </li>
            <li>
              <CheckOutlined /> <span>إرسال و إستقبال الرسائل</span>
            </li>
            <li>
              <CheckOutlined /> <span>العضوية الذهبية</span>
            </li>
            <li>
              <CheckOutlined /> <span>10 مسابقة / شهر</span>
            </li>
          </StyledList>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StyledH1>السنوي</StyledH1>
          <h3>الدفع كل سنة</h3>
          <Space>
            <StyledH1>$25</StyledH1>
            <span>/ السنة</span>
          </Space>
          <StyledButton type="primary" block shape="round">
            إشترك
          </StyledButton>
          <StyledList>
            <li>
              <CheckOutlined /> <span>الإشراف على الطلبة</span>
            </li>
            <li>
              <CheckOutlined /> <span>إرسال و إستقبال الرسائل</span>
            </li>
            <li>
              <CheckOutlined /> <span>العضوية الذهبية</span>
            </li>
            <li>
              <CheckOutlined /> <span>30 مسابقة / شهر</span>
            </li>
          </StyledList>
        </Card.Grid>
        <Badge.Ribbon text="الأكثر طلبا" color="green">
          <Card.Grid style={{ ...gridStyle, width: '105%', height: '100%' }}>
            <StyledH1>مدى الحياة</StyledH1>
            <h3>الدفع مرة واحدة فقط</h3>
            <Space>
              <StyledH1>$250</StyledH1>
              <span>/ مدى الحياة</span>
            </Space>
            <StyledButton type="primary" block shape="round">
              إشترك
            </StyledButton>
            <StyledList>
              <li>
                <CheckOutlined /> <span>الإشراف على الطلبة</span>
              </li>
              <li>
                <CheckOutlined /> <span>إرسال و إستقبال الرسائل</span>
              </li>
              <li>
                <CheckOutlined /> <span>العضوية الذهبية</span>
              </li>
              <li>
                <CheckOutlined /> <span>90 مسابقة / شهر</span>
              </li>
            </StyledList>
          </Card.Grid>
        </Badge.Ribbon>
      </Card>
    </>
  );
};

TeacherMembership.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);

export default TeacherMembership;
