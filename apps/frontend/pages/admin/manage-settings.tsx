import { Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { appDataVar, getTitleMeta } from '@/utils/app';
import { useEffect, useState } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/common/withAuth';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import AppSettingsForm from '@/components/admin/settings/AppSettingsForm';
import { App, PermissionTitle, useFindAppConfigQuery } from '@/graphql/graphql';
import ManageSubscriptionPlans from '@/components/admin/settings/ManageSubscriptionPlans';
import Head from 'next/head';

const AppPrivacyForm = dynamic(
  () => import('@/components/admin/settings/AppPrivacyForm'),
  {
    ssr: false,
  }
);
const AppAboutUsForm = dynamic(
  () => import('@/components/admin/settings/AppAboutUsForm'),
  {
    ssr: false,
  }
);
const AppAgreementForm = dynamic(
  () => import('@/components/admin/settings/AppAgreementForm'),
  {
    ssr: false,
  }
);

export enum AppTabs {
  APP_CONFIG = 'APP_CONFIG',
  AGREEMENT = 'AGREEMENT',
  PRIVACY = 'PRIVACY',
  ABOUT_US = 'ABOUT_US',
  PLANS = 'PLANS',
}

const ManageSettings = () => {
  const { data, loading } = useFindAppConfigQuery();
  appDataVar(data?.findAppConfig as App);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>(AppTabs.APP_CONFIG);

  useEffect(() => {
    const tab = String(router.query?.tab);
    const active = Object.values(AppTabs).includes(tab as AppTabs)
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
      label: 'الشروط و الأحكام',
      key: AppTabs.AGREEMENT,
      children: <AppAgreementForm />,
    },
    {
      label: 'سياسة الخصوصية',
      key: AppTabs.PRIVACY,
      children: <AppPrivacyForm />,
    },
    {
      label: 'حول الموقع',
      key: AppTabs.ABOUT_US,
      children: <AppAboutUsForm />,
    },
    {
      label: 'خطط الإشتراك',
      key: AppTabs.PLANS,
      children: <ManageSubscriptionPlans />,
    },
  ];

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'الإعدادت')}</title>
      </Head>
      {loading ? (
        <Loading />
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
      )}
    </>
  );
};

ManageSettings.getLayout = (page: EmotionJSX.Element) => (
  <AdminLayout>{page}</AdminLayout>
);
export default withAuth(ManageSettings, [PermissionTitle.AccessDashboard]);
