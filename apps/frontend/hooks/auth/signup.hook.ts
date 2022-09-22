import { FormInstance } from 'antd/es/form/Form';
import { Rule } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useState } from 'react';

import { RoleTitle, useSignUpMutation } from '@/graphql/graphql';
import {
  ConstraintsErrors,
  GraphqlResponseError,
  SignUpInput,
} from '@/utils/types';

export const useSignUp = (form: FormInstance<unknown>) => {
  const [SignUpMutation, { loading }] = useSignUpMutation();

  const [registeredEmail, setRegisteredEmail] = useState<string>(null);

  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [role, setRole] = useState<RoleTitle>(null);

  const handleRoleSelect = (value: RoleTitle) => {
    setRole(value);
    setVisible(true);
    if (value !== RoleTitle.StudentTeacher) {
      setSelectedSupervisor(null);
      setVisible(false);
    }
  };

  const handleInstructorSelect = (value: string) => {
    setSelectedSupervisor(value);
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const onFinish = async (values: SignUpInput) => {
    values.teacherId = selectedSupervisor;
    setRegisteredEmail(values.email);
    try {
      const { data } = await SignUpMutation({
        variables: {
          input: values,
        },
      });
      if (data?.signup) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.networkError?.statusCode === 422) {
        const validationErrors: ConstraintsErrors[] =
          error.networkError.result.errors[0].errors.map(
            (el: GraphqlResponseError) => el.constraints
          );
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
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    console.log('Failed:', errorInfo);
  };
  const roleHandler = {
    handleInstructorSelect,
    handleRoleSelect,
    handleVisibleChange,
    role,
    visible,
    selectedSupervisor,
  };

  return {
    onFinish,
    onFinishFailed,
    loading,
    roleHandler,
    isSuccess,
    registeredEmail,
  };
};

export const emailRules: Rule[] = [
  { required: true, message: 'يرجى كتابة بريدك الإلكتروني.' },
  { type: 'email', message: 'يرجى كتابة بريدك الإلكتروني بشكل صحيح.' },
];

export const roleRules: Rule[] = [
  { required: true, message: 'يرجى تحديد نوع العضوية الخاصة بك.' },
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
