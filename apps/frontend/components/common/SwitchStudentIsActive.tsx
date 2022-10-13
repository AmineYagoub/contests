import { User, useUpdateUserMutation } from '@/graphql/graphql';
import { StudentState } from '@/valtio/student.state';
import { Switch } from 'antd';
import { FC, useState } from 'react';

const SwitchStudentIsActive: FC<{ user: User; inTable: boolean }> = ({
  user,
  inTable,
}) => {
  const [checked, setChecked] = useState(user.isActive);
  const [UpdateUserMutation, { loading }] = useUpdateUserMutation();
  const onUserStateChange = (value: boolean) => {
    UpdateUserMutation({
      variables: { id: user.id, input: { isActive: value } },
    }).then(() => {
      if (inTable) {
        for (const el of StudentState.students) {
          if (el.id === user.id) {
            el.isActive = value;
          }
        }
      }
      setChecked(value);
    });
  };
  return (
    <Switch
      checkedChildren="نشط"
      unCheckedChildren="غير نشط"
      defaultChecked={checked}
      checked={checked}
      onChange={(value) => onUserStateChange(value)}
      loading={loading}
    />
  );
};

export default SwitchStudentIsActive;
