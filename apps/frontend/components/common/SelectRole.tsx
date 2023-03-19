import { Form, Popover, Select, Space, Tooltip } from 'antd';
import { Rule } from 'antd/lib/form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { RoleTitle, Teacher, useFindTeacherQuery } from '@/graphql/graphql';
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
  isSignUp = true,
  placeholder = null,
}: {
  selectedSupervisor: string;
  setSelectedSupervisor: Dispatch<SetStateAction<string>>;
  isSignUp: boolean;
  placeholder?: string;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [role, setRole] = useState<RoleTitle>(null);

  const { data, loading, refetch } = useFindTeacherQuery();

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

  const handleSearch = async (newValue: string) => {
    await refetch({
      name: newValue,
    });
  };

  useEffect(() => {
    if (role) {
      setDisabled(role !== RoleTitle.StudentTeacher);
      return;
    }
    setDisabled(!selectedSupervisor);
  }, [selectedSupervisor, role]);

  return (
    <Form.Item label="نوع العضوية" style={{ marginBottom: 0 }} required>
      <Form.Item
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        name="role"
        rules={roleRules}
      >
        <Select onChange={handleRoleSelect}>
          {isSignUp && <Option value={RoleTitle.Teacher}>معلم مشرف</Option>}
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
            disabled={disabled}
            showArrow
            filterOption={false}
            showSearch
            value={selectedSupervisor}
            onChange={handleInstructorSelect}
            onSearch={handleSearch}
            loading={loading}
            placeholder={placeholder}
          >
            {data?.findTeacher.map((el) => {
              const { firstName, lastName } = el.profile as Teacher;
              return (
                <Option value={el.id} key={el.id}>
                  {el.role.title === RoleTitle.GoldenTeacher ? (
                    <Tooltip title="معلم ذهبي">
                      <Space size={10} align="center">
                        <span role="img" aria-label="China">
                          &#127775;
                        </span>
                        <strong>{`${firstName} ${lastName}`}</strong>
                      </Space>
                    </Tooltip>
                  ) : (
                    <span
                      style={{ display: 'inline-block', marginRight: 20 }}
                    >{`${firstName} ${lastName}`}</span>
                  )}
                </Option>
              );
            })}
          </Select>
        </Popover>
      </Form.Item>
    </Form.Item>
  );
};

export default SelectRole;
