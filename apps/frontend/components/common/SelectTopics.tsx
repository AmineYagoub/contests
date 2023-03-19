import { Form, Select, Spin, Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { StudentLevel, useFindTopicsLazyQuery } from '@/graphql/graphql';
import { QuestionFields } from '@/utils/fields';
import { getLevelsLabel, studentMappedLevels } from '@/utils/mapper';

import type { SelectProps } from 'antd/es/select';
export interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  isContest: boolean;
}

const { Option } = Select;

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
    level: StudentLevel[];
  }
>({
  fetchOptions,
  isContest,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Form.Item
      name={QuestionFields.topics}
      label="الموضوعات"
      rules={
        isContest
          ? [
              () => ({
                validator(_, value) {
                  if (value.length >= 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('يرجى تحديد 5 مواضيع للمسابقة على الأقل!')
                  );
                },
              }),
            ]
          : []
      }
      required
    >
      <Select
        allowClear
        showArrow
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        onFocus={() => debounceFetcher('')}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
      >
        {options.map((el) => (
          <Option key={el.value} value={el.value} label={el.label}>
            <Tooltip
              title={el.level.map(
                (el) => getLevelsLabel(studentMappedLevels, el) + ', '
              )}
            >
              <div>{el.label}</div>
            </Tooltip>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export interface TagValue {
  label: string;
  value: string;
  level: StudentLevel[];
}

const SelectTopics = ({
  isContest,
  selectedLevel,
  isTeacher,
}: {
  isContest: boolean;
  isTeacher: boolean;
  selectedLevel?: StudentLevel[];
}) => {
  const [value, setValue] = useState<TagValue[]>([]);
  const [FindTopicsQuery] = useFindTopicsLazyQuery();
  const fetchTags = useCallback(
    async (search: string) => {
      if (isTeacher || selectedLevel.length > 0) {
        const { data } = await FindTopicsQuery({
          variables: {
            title: search,
            level: selectedLevel,
          },
        });
        return data.findTopics.map((topic) => ({
          label: topic.title,
          value: topic.id,
          level: topic.level,
        }));
      }

      return [];
    },
    [FindTopicsQuery, selectedLevel, isTeacher]
  );

  return (
    <DebounceSelect
      mode="multiple"
      maxTagCount={3}
      value={value}
      placeholder="البحث عن موضوعات"
      fetchOptions={fetchTags}
      onChange={(newValue) => {
        setValue(newValue as TagValue[]);
      }}
      style={{ width: '100%' }}
      isContest={isContest}
    />
  );
};

export default SelectTopics;
