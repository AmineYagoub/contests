import { notification } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { Rule } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useState } from 'react';

import {
  SignUpDto,
  useResendEmailActivationCodeMutation,
  useSignUpMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { ConstraintsErrors, SignUpInput } from '@/utils/types';
import { useRouter } from 'next/router';
import { AppRoutes } from '@/utils/routes';

const handleSignUpErrors = (error: any, form: FormInstance<unknown>) => {
  Logger.log(error);
  if (error.networkError?.statusCode === 400) {
    notification.error({
      message: 'لا يمكن معالجة طلبك! يرجى التواصل مع إدارة الموقع.',
    });
    return;
  }
  if (error.networkError?.statusCode === 422) {
    if (error.networkError?.result?.errors[0]?.message === 'P2002') {
      form.setFields([
        {
          name: 'email',
          errors: ['هذا البريد الإلكتروني مسجل حاليا, يرجى تسجيل دخولك.'],
        },
      ]);
      return false;
    }
    const validationErrors: ConstraintsErrors[] =
      error.networkError?.result?.errors[0]?.errors;
    validationErrors.forEach((element) => {
      if (element?.isEmail) {
        form.setFields([
          {
            name: 'email',
            errors: ['يرجى كتابة البريد الإلكتروني بشكل صحيح.'],
          },
        ]);
      }
      if (element?.minLength) {
        form.setFields([
          {
            name: 'password',
            errors: ['كلمة السر يجب أن تحتوي على 8 رموز أو أكثر.'],
          },
        ]);
      }
      if (element?.isPasswordMatch) {
        form.setFields([
          {
            name: 'confirmPassword',
            errors: ['يرجى التأكد من كلمة السر المدخلة.'],
          },
        ]);
      }
      if (element?.isStudentHasTeacher) {
        form.setFields([
          {
            name: 'teacherId',
            errors: ['يرجى تحديد إسم المشرف من القائمة.'],
          },
        ]);
      }
      if (element?.isAcceptAgreement) {
        form.setFields([
          {
            name: 'agreement',
            errors: ['يرجى قراءة و قبول إتفاقية الإستخدام.'],
          },
        ]);
      }
    });
    return;
  }
  notification.error({
    message: 'حدث خطأ, يرجى إعادة تحديث الصفحة و المحاولة من جديد !',
  });
};

const clearErrors = (field: SignUpDto, form: FormInstance<unknown>) => {
  let target = null;
  if (field.confirmPassword || field.password) {
    form.setFields([
      {
        name: 'password',
        errors: [],
      },
      {
        name: 'confirmPassword',
        errors: [],
      },
    ]);
  }
  if (field.role || field.teacherId) {
    form.setFields([
      {
        name: 'teacherId',
        errors: [],
      },
      {
        name: 'role',
        errors: [],
      },
    ]);
  }
  if (field.email) {
    target = 'email';
  }
  if (field.agreement) {
    target = 'agreement';
  }

  if (target) {
    form.setFields([
      {
        name: target,
        errors: [],
      },
    ]);
  }
};

export const useSignUp = (form: FormInstance<unknown>) => {
  const router = useRouter();
  const [SignUpMutation, { loading }] = useSignUpMutation();
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(null);

  const onFinish = async (values: SignUpInput) => {
    values.teacherId = selectedSupervisor;
    values.agreement = Boolean(values.agreement);
    setRegisteredEmail(values.email);
    try {
      const { data } = await SignUpMutation({
        variables: {
          input: values,
        },
      });
      if (data?.signup) {
        // setSuccess(true); TODO Set success to true to show email verification form
        notification.success({
          message: 'تم تسجيل حسابك بنجاح, يرجى تسجيل الدخول.',
        });
        router.push(AppRoutes.SignIn);
      }
    } catch (error) {
      handleSignUpErrors(error, form);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return {
    onFinish,
    onFinishFailed,
    clearErrors,
    loading,
    isSuccess,
    registeredEmail,
    selectedSupervisor,
    setSelectedSupervisor,
  };
};

export const useResendEmailActivationCode = () => {
  const [ResendEmailActivationCodeMutation, { loading }] =
    useResendEmailActivationCodeMutation();
  const [message, setMessage] = useState<string>(null);

  const onSubmit = async (email: string) => {
    try {
      const { data } = await ResendEmailActivationCodeMutation({
        variables: {
          input: { email },
        },
      });
      if (data) {
        setMessage(
          'تم إرسال بريد التفعيل مرة أخرى, إذا واجهت نفس المشكلة يرجى التواصل مع فريق الدعم.'
        );
      }
    } catch (error) {
      Logger.log(error);
      setMessage(
        'لم نتمكن من إرسال بريد التفعيل مرة أخرى, يرجى التواصل مع فريق الدعم.'
      );
    }
  };
  return { onSubmit, message, loading };
};

export const emailRules: Rule[] = [
  { required: true, message: 'يرجى كتابة بريدك الإلكتروني.' },
  { type: 'email', message: 'يرجى كتابة بريدك الإلكتروني بشكل صحيح.' },
];

export const passwordRules: Rule[] = [
  { required: true, message: 'يرجى كتابة كلمة السر.' },
  { min: 8, message: 'كلمة السر يجب أن تحتوي على 8 رموز أو أكثر.' },
];

export const confirmPasswordRules: Rule[] = [
  { required: true, message: 'يرجى تأكيد كلمة السر.' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('كلمتا السر غير متطابقتين!'));
    },
  }),
];
