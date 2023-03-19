import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useState } from 'react';

import {
  useEmailTokenToRecoverPasswordMutation,
  User,
  useUpdateUserMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';

export const useRequestUpdatePassword = () => {
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const [EmailTokenToRecoverPasswordMutation, { loading }] =
    useEmailTokenToRecoverPasswordMutation();

  const onFinish = async ({ email }: { email: string }) => {
    try {
      await EmailTokenToRecoverPasswordMutation({
        variables: {
          input: {
            email,
          },
        },
      });
    } catch (error) {
      Logger.log(error);
    } finally {
      setSuccess(true); // we d'ont need user to know about errors
    }
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return { onFinish, onFinishFailed, loading, isSuccess };
};

export type UpdatePasswordValues = {
  password: string;
  confirmPassword: string;
};

export const useUpdatePassword = () => {
  const [user, setUser] = useState<User>(null);
  const [UpdateUserMutation, { loading }] = useUpdateUserMutation();

  const onFinish = async (
    values: UpdatePasswordValues & {
      id: string;
    }
  ) => {
    const { id, ...input } = values;
    try {
      const user = await UpdateUserMutation({
        variables: {
          input,
          id,
        },
      });
      setUser(user as User);
    } catch (error) {
      Logger.log(error);
    }
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return { onFinish, onFinishFailed, loading, user };
};
