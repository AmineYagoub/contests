import { FormInstance } from 'antd/es/form/Form';
import { Rule } from 'antd/lib/form';
import { useRouter } from 'next/router';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

import { config } from '@/config/index';
import { useSigningMutation } from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AppRoutes } from '@/utils/routes';

import type { SigningInput } from '@/utils/types';
export const useSigning = (form: FormInstance<unknown>) => {
  const [SigningMutation, { loading }] = useSigningMutation();
  const router = useRouter();

  const onFinish = async (values: SigningInput) => {
    try {
      const { data } = await SigningMutation({
        variables: {
          input: values,
        },
      });
      if (data) {
        const { accessToken, refreshToken } = data.signing;
        localStorage.setItem(config.jwtName, accessToken);
        localStorage.setItem(config.refreshJwtName, refreshToken);
        router.push(String(router?.query?.from || AppRoutes.StudentDashboard));
      }
    } catch (error) {
      Logger.log(error);
      if (error.networkError?.statusCode === 404) {
        form.setFields([
          {
            name: 'email',
            errors: ['هذا البريد غير مسجل حاليا. يرجى تسجيل حسابك الجديد'],
          },
        ]);
        return;
      }
      form.setFields([
        {
          name: 'email',
          errors: ['بيانات حسابك غير صحيحة, يرجى التحقق من بياناتك.'],
        },
        {
          name: 'password',
          errors: ['بيانات حسابك غير صحيحة, يرجى التحقق من بياناتك.'],
        },
      ]);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return { onFinish, onFinishFailed, loading };
};

export const emailRules: Rule[] = [
  { required: true, message: 'يرجى كتابة بريدك الإلكتروني.' },
  { type: 'email', message: 'يرجى كتابة بريدك الإلكتروني بشكل صحيح.' },
];

export const passwordRules: Rule[] = [
  { required: true, message: 'يرجى كتابة كلمة السر.' },
];
