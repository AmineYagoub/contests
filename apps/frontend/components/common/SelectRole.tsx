import { Form, Popover, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { Dispatch, SetStateAction, useState } from 'react';

import { RoleTitle } from '@/graphql/graphql';
import styled from '@emotion/styled';

const { Option } = Select;

export const StyledSpace = styled('span')({
  display: 'inline-block',
  width: '24px',
  lineHeight: '32px',
  textAlign: 'center',
});

const roleRules: Rule[] = [
  { required: true, message: 'يرجى تحديد نوع العضوية الخاصة بك.' },
];

const SelectRole = ({
  selectedSupervisor,
  setSelectedSupervisor,
}: {
  selectedSupervisor: string;
  setSelectedSupervisor: Dispatch<SetStateAction<string>>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
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
  return (
    <Form.Item
      label="نوع العضوية"
      style={{ marginBottom: 0 }}
      rules={[{ required: true, message: '' }]}
    >
      <Form.Item
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        name="role"
        rules={roleRules}
      >
        <Select onChange={handleRoleSelect}>
          <Option value={RoleTitle.Teacher}>معلم مشرف</Option>
          <Option value={RoleTitle.StudentTeacher}>طالب مرتبط بمشرف</Option>
          <Option value={RoleTitle.Student}>طالب</Option>
        </Select>
      </Form.Item>
      <StyledSpace>-</StyledSpace>
      <Form.Item
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        name="teacherId"
      >
        <Popover
          title="إختر المعلم المشرف"
          trigger="click"
          open={visible}
          onOpenChange={handleVisibleChange}
        >
          <Select
            disabled={role !== RoleTitle.StudentTeacher}
            showSearch
            value={selectedSupervisor}
            onChange={handleInstructorSelect}
          >
            <Option value="teacherId1">معلم 1</Option>
            <Option value="teacherId2">معلم 2</Option>
            <Option value="teacherId3">معلم 3</Option>
          </Select>
        </Popover>
      </Form.Item>
    </Form.Item>
  );
};

export default SelectRole;
