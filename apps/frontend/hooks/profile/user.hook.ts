import { notification } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useEffect, useState } from 'react';

import {
  Student,
  StudentLevel,
  UpdateStudentDto,
  User,
  useUpdateStudentProfileMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthActions } from '@/valtio/auth.state';

import type { RcFile } from 'antd/es/upload/interface';
export const useUser = (form: FormInstance<unknown>, user: User) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(null);
  const [UpdateStudentProfileMutation, { loading }] =
    useUpdateStudentProfileMutation();

  useEffect(() => {
    if (user) {
      const profile = user.profile as Student;
      form.setFieldsValue({
        email: user?.email,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        role: user.role.title,
        teacherId: profile?.teacher?.id,
        country: profile?.country,
        level: profile?.level === StudentLevel.Student ? null : profile?.level,
        dateOfBirth: moment(profile?.dateOfBirth),
      });

      if (profile?.teacher) {
        setSelectedSupervisor(
          `${profile.teacher.firstName} ${profile.teacher.lastName}`
        );
      }
    }
  }, [form, user]);

  const onFinish = async (values: UpdateStudentDto) => {
    const { firstName, lastName, level, role, country, dateOfBirth } = values;
    try {
      const { data } = await UpdateStudentProfileMutation({
        variables: {
          id: user.id,
          input: {
            firstName,
            lastName,
            level,
            role,
            country,
            teacherId: selectedSupervisor,
            dateOfBirth,
          },
        },
      });
      if (data?.updateStudentProfile) {
        notification.success({
          message: 'تم تحديث بياناتك بنجاح !',
        });
        AuthActions.setUser(data?.updateStudentProfile as User);
      }
    } catch (error) {
      notification.error({
        message: 'حدث خطأ, يرجى إعادة تحديث الصفحة و المحاولة من جديد !',
      });
      Logger.log(error);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return {
    onFinish,
    onFinishFailed,
    selectedSupervisor,
    setSelectedSupervisor,
    loading,
  };
};

export type RcCustomRequestOptions = {
  file: string | Blob | RcFile;
  onError?: (error: Error) => void;
  onProgress?: (event: Event) => void;
  onSuccess?: (body: Response, xhr?: XMLHttpRequest) => void;
};
