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
import { useEffect } from 'react';

import SelectCountry from '@/components/common/SelectCountry';
import SelectTopics from '@/components/common/SelectTopics';
import { Contest, RoleTitle } from '@/graphql/graphql';
import { ContestFields } from '@/utils/fields';
import { contestMappedTypes, studentMappedLevels } from '@/utils/mapper';

import type { RangePickerProps } from 'antd/es/date-picker';
import { useSnapshot } from 'valtio';
import { AuthState } from '@/valtio/auth.state';
import SelectContestParticipants from './SelectContestParticipants';

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
        topics: record.topics.map((tag) => ({
          value: tag.title,
          label: tag.title,
        })),
      });
    }
    return () => form.resetFields();
  }, [form, record]);

  const user = useSnapshot(AuthState).user;
  const getTeacherId =
    user?.role.title === RoleTitle.GoldenTeacher ? user?.profile.id : null;

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
          <Form.Item name={ContestFields.level} label="المستوى المستهدف">
            <Select
              disabled={user?.role.title !== RoleTitle.Admin}
              mode="tags"
              allowClear
              showArrow
              options={studentMappedLevels}
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
              <InputNumber placeholder="عدد الأسئلة" />
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
              <InputNumber style={{ width: 105 }} placeholder="عدد الأسئلة" />
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
              <InputNumber placeholder="عدد الأسئلة" />
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
            required
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <SelectTopics />
      <Row gutter={16}>
        <Col span={12}>
          <SelectCountry
            name={ContestFields.countries}
            label="الدول المشاركة"
            multiple
          />
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

      <SelectContestParticipants teacherId={getTeacherId} />
    </Form>
  );
};

export default ContestForm;
