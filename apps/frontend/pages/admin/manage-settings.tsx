import AppSettingsForm from '@/components/admin/settings/AppSettingsForm';
import ManageSubscriptionPlans from '@/components/admin/settings/ManageSubscriptionPlans';
import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';
import AdminLayout from '@/layout/AdminLayout';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Spin, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AppAgreementForm = dynamic(
  () => import('@/components/admin/settings/AppAgreementForm'),
  {
    ssr: false,
  }
);

export enum AppTabs {
  APP_CONFIG = 'app-config',
  AGREEMENT = 'agreement',
  PLANS = 'plans',
}

const ManageSettings = () => {
  //  const { data, loading } = useFindAppDataQuery();
  const loading = false;
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>(AppTabs.APP_CONFIG);

  useEffect(() => {
    const tab = String(router.query?.tab);
    const active = Object.values(AppTabs).includes(tab as any)
      ? tab
      : AppTabs.APP_CONFIG;
    setActiveKey(active);
  }, [router.query]);

  const items = [
    {
      label: 'إعدادات عامة',
      key: AppTabs.APP_CONFIG,
      children: <AppSettingsForm />,
    },
    {
      label: 'إتفاقية الإستخدام',
      key: AppTabs.AGREEMENT,
      children: <AppAgreementForm />,
    },
    {
      label: 'خطط الإشتراك',
      key: AppTabs.PLANS,
      children: <ManageSubscriptionPlans />,
    },
  ];

  return loading ? (
    <div style={{ margin: '100px 0', textAlign: 'center' }}>
      <Spin />
    </div>
  ) : (
    <Tabs
      type="card"
      defaultActiveKey={AppTabs.APP_CONFIG}
      activeKey={activeKey}
      onTabClick={(key, _) => {
        router.push(
          {
            pathname: '/admin/manage-settings/',
            query: { tab: key },
          },
          undefined,
          { shallow: true }
        );
        setActiveKey(key);
      }}
      destroyInactiveTabPane
      items={items}
    />
  );
};

ManageSettings.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default withAuth(ManageSettings, [PermissionTitle.AccessDashboard]);
