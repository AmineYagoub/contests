import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import Image from 'next/image';
import { FocusEvent, useEffect, useState } from 'react';

import SelectTags from '@/components/common/SelectTags';
import { Contest } from '@/graphql/graphql';
import { ContestFields } from '@/utils/fields';
import { contestMappedTypes, studentMappedLevels } from '@/utils/mapper';

import type { RangePickerProps } from 'antd/es/date-picker';
const { Option } = Select;

/**
 * Can not select days before today and today.
 *
 * @param current - current date
 * @returns - function that can be used in DatePicker's onChange callback
 */
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < moment().endOf('day');
};

const ContestForm = ({
  form,
  record,
}: {
  form: FormInstance;
  record?: Contest;
}) => {
  type ContriesType = {
    name: string;
    flag: string;
  };
  const [countries, setCountries] = useState<ContriesType[]>();
  const [countriesStor, setCountriesStor] = useState<ContriesType[]>();

  const handleFetchCountries = (e: FocusEvent<HTMLElement, Element>) => {
    if (!countries) {
      fetch(process.env.NEXT_PUBLIC_COUNTRIES_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
          const c = data.map((country) => ({
            name: country.name.common,
            flag: country.flags.png,
          }));
          setCountries(c);
          setCountriesStor(c);
        });
    }
  };
  const handleChangeCountries = (value) => {
    if (value.length === 0) {
      setCountries(countriesStor);
    }
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      setCountries(
        countriesStor?.filter((country) =>
          country.name.toLowerCase().match(newValue.toLowerCase())
        )
      );
    } else {
      setCountries(countriesStor);
    }
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        duration: record.duration,
        easyQuestionCount: record.easyQuestionCount,
        mediumQuestionCount: record.mediumQuestionCount,
        hardQuestionCount: record.hardQuestionCount,
        title: record.title,
        level: record.level,
        type: record.type,
        countries: record.countries,
        startTime: moment(record.startTime),
        maxParticipants: record.maxParticipants,
        tags: record.tags.map((tag) => ({
          value: tag.title,
          label: tag.title,
        })),
      });
    }
    return () => form.resetFields();
  }, [form, record]);

  return (
    <Form
      layout="vertical"
      scrollToFirstError
      form={form}
      name={`${record} ? update-contest : create-contest`}
      initialValues={{
        duration: 40,
        questionCount: 100,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={ContestFields.title}
            label="عنوان المسابقة"
            rules={[{ required: true, message: 'يرجى كتابة عنوان للمسابقة' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={ContestFields.level}
            label="المستوى المستهدف"
            rules={[{ required: true, message: 'يرجى تحديد مستوى المسابقة' }]}
          >
            <Select
              mode="tags"
              allowClear
              showArrow
              options={studentMappedLevels}
              fieldNames={{ label: 'text' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={ContestFields.type}
            label="نوع المسابقة"
            rules={[{ required: true, message: 'يرجى إختيار نوع المسابقة' }]}
          >
            <Select
              allowClear
              showArrow
              options={contestMappedTypes}
              fieldNames={{ label: 'text' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Space size={20}>
            <Form.Item
              name={ContestFields.easyQuestionCount}
              label="الأسئلة السهلة"
              rules={[
                {
                  required: true,
                  message: 'يرجى تحديد عدد الأسئلة السهلة للمسابقة',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={ContestFields.mediumQuestionCount}
              label="الأسئلة المتوسطة"
              rules={[
                {
                  required: true,
                  message: 'يرجى تحديد عدد الأسئلة المتوسطة للمسابقة',
                },
              ]}
            >
              <InputNumber style={{ width: 105 }} />
            </Form.Item>
            <Form.Item
              name={ContestFields.hardQuestionCount}
              label="الأسئلة الصعبة"
              rules={[
                {
                  required: true,
                  message: 'يرجى تحديد عدد الأسئلة الصعبة للمسابقة',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Space>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={ContestFields.startTime}
            label="موعد إجراء المسابقة"
            rules={[
              { required: true, message: 'يرجى تحديد تاريخ بدء المسابقة' },
            ]}
            help="توقيت القاهرة"
            required
          >
            <DatePicker
              showTime
              showToday
              allowClear
              style={{ width: '100%' }}
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={ContestFields.duration}
            label="مدة المسابقة"
            rules={[{ required: true, message: 'يرجى تحديد مدة المسابقة' }]}
            help="المدة الزمنية بالدقائق"
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={ContestFields.countries}
            label="الدول المشاركة"
            help="أتركه فارغا للسماح بجميع الدول"
          >
            <Select
              mode="multiple"
              allowClear
              showArrow
              filterOption={false}
              showSearch
              value={countries}
              onFocus={handleFetchCountries}
              onChange={handleChangeCountries}
              onSearch={handleSearch}
              notFoundContent={null}
            >
              {countries?.map((country) => (
                <Option key={country.name} value={country.name}>
                  <Image
                    loading="lazy"
                    width="20"
                    height="12"
                    src={country.flag}
                    alt={country.name}
                  />
                  <b style={{ margin: '0 5px', display: 'inline-block' }}>
                    {country.name}
                  </b>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={ContestFields.maxParticipants}
            label="الحد الأقصى لعدد المشاركين"
            help="أتركه فارغاً للسماح بعدد لا نهائي"
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={ContestFields.participants}
        label="الطلاب المستهدفين"
        help="لن تظهر المسابقة إلا للطبة المحددين في هذا الحقل"
      >
        <Select allowClear showArrow fieldNames={{ label: 'text' }} />
      </Form.Item>
      <SelectTags />
    </Form>
  );
};

export default ContestForm;
