import { FormInstance } from 'antd/es/form/Form';
import { Rule } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useState } from 'react';

import { Logger } from '@/utils/app';
import { SignUpInput } from '@/utils/types';

export const useUser = (form: FormInstance<unknown>) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(null);

  const onFinish = async (values: SignUpInput) => {
    console.log('first');
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<unknown>) => {
    Logger.log(errorInfo);
  };

  return {
    onFinish,
    onFinishFailed,
    selectedSupervisor,
    setSelectedSupervisor,
  };
};
