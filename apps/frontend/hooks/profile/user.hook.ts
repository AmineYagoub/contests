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
  useUpdateTeacherProfileMutation,
  useUpdateStudentProfileMutation,
  RoleTitle,
  UpdateTeacherDto,
  Teacher,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';

import type { RcFile } from 'antd/es/upload/interface';
export const useUser = (form: FormInstance<unknown>, user: User) => {
  const isTeacher = [RoleTitle.GoldenTeacher, RoleTitle.Teacher].includes(
    user.role.title
  );
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(null);
  const [UpdateStudentProfileMutation, { loading }] =
    useUpdateStudentProfileMutation();

  const [UpdateTeacherProfileMutation, { loading: tLoading }] =
    useUpdateTeacherProfileMutation();

  useEffect(() => {
    if (user) {
      const profile = user.profile as Student;
      const phone = (user.profile as Teacher)?.phone;
      form.setFieldsValue({
        email: user?.email,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        role: user.role.title,
        teacherId: profile?.teacher?.id,
        country: profile?.country,
        level: profile?.level === StudentLevel.Student ? null : profile?.level,
        dateOfBirth: moment(profile?.dateOfBirth),
        phone: phone?.phone,
        phoneCode: phone?.phoneCode,
      });

      if (profile?.teacher) {
        setSelectedSupervisor(
          `${profile.teacher.firstName} ${profile.teacher.lastName}`
        );
      }
    }
  }, [form, user]);

  const onFinish = async (values: UpdateStudentDto | UpdateTeacherDto) => {
    let res = false;
    try {
      if (isTeacher) {
        const { firstName, lastName, phone, phoneCode, country, dateOfBirth } =
          values as UpdateTeacherDto;
        const { data } = await UpdateTeacherProfileMutation({
          variables: {
            id: user.id,
            input: {
              firstName,
              lastName,
              phone,
              phoneCode,
              country,
              dateOfBirth,
            },
          },
        });
        res = !!data?.updateTeacherProfile;
      } else {
        const { firstName, lastName, level, role, country, dateOfBirth } =
          values as UpdateStudentDto;
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
        res = !!data?.updateStudentProfile;
      }
      if (res) {
        notification.success({
          message: 'تم تحديث بياناتك بنجاح !',
        });
        // AuthActions.setUser(data?.updateStudentProfile as User);
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
    tLoading,
  };
};

export type RcCustomRequestOptions = {
  file: string | Blob | RcFile;
  onError?: (error: Error) => void;
  onProgress?: (event: Event) => void;
  onSuccess?: (body: Response, xhr?: XMLHttpRequest) => void;
};
