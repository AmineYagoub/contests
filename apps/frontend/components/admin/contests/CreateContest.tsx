import {
  Alert,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { FocusEvent, useState } from 'react';

import {
  Contest,
  ContestStatus,
  useCreateContestMutation,
  useUpdateContestMutation,
} from '@/graphql/graphql';
import { ContestFields } from '@/utils/fields';
import { contestMappedTypes, studentMappedLevels } from '@/utils/mapper';
import { SaveOutlined } from '@ant-design/icons';

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

const CreateContest = ({
  visible,
  onClose,
  onSuccess,
  record,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  record?: Contest;
}) => {
  const [form] = Form.useForm();
  const [createContestMutation, { loading, error }] =
    useCreateContestMutation();
  const [
    UpdateContestMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateContestMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const data = Object.entries(record).length
        ? await UpdateContestMutation({
            variables: {
              input: values,
              id: Number(record.id),
            },
          })
        : await createContestMutation({
            variables: {
              input: {
                ...values,
                status: ContestStatus.NotStarted,
                authorId: 1,
              },
            },
          });

      if (data) {
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        countriesStor.filter((country) =>
          country.name.toLowerCase().match(newValue.toLowerCase())
        )
      );
    } else {
      setCountries(countriesStor);
    }
  };

  return (
    <Drawer
      title="إنشاء مسابقة جديدة"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
      bodyStyle={{ paddingBottom: 80 }}
      width={720}
      extra={
        <Space>
          <Button onClick={onClose} htmlType="reset">
            تراجع
          </Button>
          <Button
            onClick={onFinish}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            form="create-contest"
            loading={loading || loadingUpdate}
          >
            حفظ
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        hideRequiredMark
        scrollToFirstError
        form={form}
        name="create-contest"
        initialValues={{
          duration: record.duration ?? 40,
          questionCount: record.questionCount ?? 100,
          title: record?.title,
          type: record?.type,
        }}
      >
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
        </Row>
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
              label="مستوى المسابقة"
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
              name={ContestFields.startTime}
              label="تاريخ البدء"
              rules={[
                { required: true, message: 'يرجى تحديد تاريخ بدء المسابقة' },
              ]}
              help="توقيت القاهرة"
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
              name={ContestFields.questionCount}
              label="عدد أسئلة المسابقة"
              rules={[
                { required: true, message: 'يرجى تحديد عدد أسئلة المسابقة' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
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
      </Form>
      {(error || errorUpdate) && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء حفظ المسابقة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default CreateContest;
