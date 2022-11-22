import { Collapse } from 'antd';
const { Panel } = Collapse;

const PaymentDetails = () => {
  return (
    <Collapse>
      <Panel header="وسائل الدفع من داخل مصر (الجنيه المصري)" key="1">
        <ol>
          <li>
            <b>فودافون كاش:</b> تحويل المبلغ المطلوب على المحفضة رقم{' '}
            <code>01066960487</code>
          </li>
          <li>
            <b>حوالة بريدية</b>: فورية من أي مكتب بريد حسب البيانات التالية
            <dl>
              <dt>إسم المستلم:</dt>
              <dd>يسري محمد محمد إبراهيم سلال</dd>
              <dt>الرقم القومي:</dt>
              <dd>27302051100491</dd>
              <dt>رقم الهاتف:</dt>
              <dd>01096263877</dd>
            </dl>
          </li>
        </ol>
      </Panel>
      <Panel header="وسائل الدفع من خارج مصر (الدولار الأمريكي)" key="2">
        <ol>
          <li>
            <b>بايبل (Paypal):</b> تحويل المبلغ المطلوب على المحفضة{' '}
            <code>nahwdotcom@gmail.com</code>
          </li>
          <li>
            <b>موني جرام (MoneyGram)</b> من أقرب فرع حسب البيانات التالية
            <dl>
              <dt>إسم المستلم:</dt>
              <dd>Yosry Mohamed Mohamed Ibrahim Sallal</dd>
              <dt>بلد المستلم:</dt>
              <dd>Egypt – Damietta</dd>
              <dt>رقم الهاتف:</dt>
              <dd>01096263877</dd>
            </dl>
          </li>

          <li>
            <b>البنك الأهلي المصري</b>: تحويل بنكي حسب البيانات التالية
            <dl>
              <dt>رقم الحساب البنكي:</dt>
              <dd>4113010111218300016</dd>
              <dt>إسم المستلم :</dt>
              <dd>يسري محمَّد محمَّد إبراهيم</dd>
              <dt>إسم المستلم بالإنجليزية:</dt>
              <dd>Yosry Mohamed Mohamed Ibrahim Sallal</dd>
              <dt>إسم البنك و عنوانه:</dt>
              <dd>البنك الأهلي المصري فرع الزَّرقا محافظة دمياط</dd>
              <dt>إسم البنك و عنوانه بالإنجليزية:</dt>
              <dd>National Bank of Egypt Damietta Governorate Zarka Branch</dd>
              <dt>SWIFT/BIC:</dt>
              <dd>NBEG EG CX411</dd>
              <dt>IBAN:</dt>
              <dd>Eg080003041130101112183000160</dd>
            </dl>
          </li>
        </ol>
      </Panel>
    </Collapse>
  );
};

export default PaymentDetails;
