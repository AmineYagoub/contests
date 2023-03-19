import { Button, Result } from 'antd';
import Link from 'next/link';

// pages/404.js
export default function Custom404() {
  return (
    <Result
      style={{ paddingBottom: 100 }}
      status="404"
      title="404"
      subTitle="المعذرة! لم نتمكن من العثور على هذه الصفحة."
      extra={
        <Link href="/">
          <Button type="primary"> العودة للرئيسية</Button>
        </Link>
      }
    />
  );
}
