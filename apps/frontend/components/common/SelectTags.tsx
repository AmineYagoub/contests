import { Form, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useFindTagsLazyQuery } from '@/graphql/graphql';
import { QuestionFields } from '@/utils/fields';

import type { SelectProps } from 'antd/es/select';
export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
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
    <Form.Item name={QuestionFields.tags} label="الموضوعات">
      <Select
        allowClear
        showArrow
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    </Form.Item>
  );
}

export interface TagValue {
  label: string;
  value: string;
}

const SelectTags = () => {
  const [value, setValue] = useState<TagValue[]>([]);
  const [FindTagsQuery] = useFindTagsLazyQuery();
  const fetchTags = useCallback(
    async (search: string) => {
      const { data } = await FindTagsQuery({
        variables: {
          title: search,
        },
      });
      return data.findTags.map((tag) => ({
        label: tag.title,
        value: tag.title,
      }));
    },
    [FindTagsQuery]
  );

  return (
    <DebounceSelect
      mode="tags"
      value={value}
      placeholder="البحث عن موضوع"
      fetchOptions={fetchTags}
      onChange={(newValue) => {
        setValue(newValue as TagValue[]);
      }}
      style={{ width: '100%' }}
    />
  );
};

export default SelectTags;
