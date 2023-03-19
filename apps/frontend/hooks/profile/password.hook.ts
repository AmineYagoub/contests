import { User, UpdateUserDto, useUpdateUserMutation } from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { ConstraintsErrors } from '@/utils/types';
import { notification } from 'antd';
import { ValidateErrorEntity, FormInstance } from 'rc-field-form/es/interface';

const handleSignUpErrors = (error: any, form: FormInstance<unknown>) => {
  Logger.log(error);
  if (error.networkError?.statusCode === 400) {
    notification.error({
      message: 'لا يمكن معالجة طلبك! يرجى التواصل مع إدارة الموقع.',
    });
    return;
  }
  if (error.networkError?.statusCode === 422) {
    const validationErrors: ConstraintsErrors[] =
      error.networkError?.result?.errors[0]?.errors;

    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((element) => {
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
      });
    }
    if (error.networkError?.result?.errors[0]?.message === 'Invalid Password') {
      form.setFields([
        {
          name: 'currentPassword',
          errors: ['كلمة السر غير صحيحة.'],
        },
      ]);
      return;
    }
  }
  notification.error({
    message: 'حدث خطأ, يرجى إعادة تحديث الصفحة و المحاولة من جديد !',
  });
};

const clearErrors = (field: UpdateUserDto, form: FormInstance<unknown>) => {
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
  if (field.currentPassword) {
    form.setFields([
      {
        name: 'currentPassword',
        errors: [],
      },
    ]);
  }
};

export const usePassword = (form: FormInstance<unknown>, user: User) => {
  const [UpdateUserMutation, { loading }] = useUpdateUserMutation();
  const onFinish = async (values: UpdateUserDto) => {
    try {
      const { data } = await UpdateUserMutation({
        variables: {
          id: user.id,
          input: values,
        },
      });
      if (data?.updateUser) {
        notification.success({
          message: 'تم تحديث كلمة السر بنجاح !',
        });
        form.resetFields();
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
  };
};
