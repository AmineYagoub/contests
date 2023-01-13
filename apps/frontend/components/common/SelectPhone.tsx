import { Logger } from '@/utils/app';
import { PhoneType, UsersActions, UsersState } from '@/valtio/user.state';
import { Form, Input, Select } from 'antd';
import Image from 'next/image';
import { FocusEvent, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

const { Option } = Select;

const SelectPhone = () => {
  const phoneSnap = useSnapshot(UsersState).phoneCode;
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [phone, setPhone] = useState<PhoneType>(null);

  const handleFetchPhones = (e: FocusEvent<HTMLElement, Element> | null) => {
    fetch(process.env.NEXT_PUBLIC_COUNTRIES_ENDPOINT)
      .then((res) => res.json())
      .then(({ data }) => {
        const phones = data.map((country: PhoneType) => ({
          phone: country.phone,
          flag: country.flag,
        }));

        setPhones(phones);
        //.setPhoneCodes(phones);
      })
      .catch((e) => Logger.log(e));
  };

  const handleChangePhones = (value) => {
    if (value?.length === 0) {
      //setPhones(phonesSnap as PhoneType[]);
    }
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      /* setPhones(
        phonesSnap?.filter((el) =>
          el.phone.toLowerCase().match(newValue.toLowerCase())
        )
      ); */
    } else {
      //setPhones(phonesSnap as PhoneType[]);
    }
  };

  return (
    <Input.Group
      compact
      style={{
        display: 'inline-block',
        width: 'calc(50% - 12px)',
        direction: 'ltr',
      }}
    >
      <Form.Item
        name="phoneCode"
        noStyle
        rules={[{ required: true, message: 'يرجى تحديد الكود الدولي لبلدك' }]}
      >
        {/* <Input
          style={{ width: '40%' }}
          addonBefore={
            <Image
              loading='lazy'
              width='20'
              height='12'
              src={phoneSnap?.flag}
              alt={phoneSnap?.phone}
            />
          }
          value={phoneSnap?.phone}
        /> */}
        <Select
          style={{ width: '40%' }}
          allowClear
          showArrow
          filterOption={false}
          showSearch
          // onFocus={handleFetchPhones}
          value={phoneSnap}
          defaultValue={phoneSnap}
          notFoundContent={null}
        >
          <Option key={phoneSnap?.phone} value={phoneSnap?.phone}>
            <Image
              loading="lazy"
              width="20"
              height="12"
              src={phoneSnap?.flag}
              alt={phoneSnap?.phone}
            />
            <b style={{ margin: '0 5px', display: 'inline-block' }}>
              {phoneSnap?.phone}
            </b>
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="phone"
        noStyle
        rules={[{ required: true, message: 'يرجى كتابة رقم هاتفك' }]}
      >
        <Input style={{ width: '60%' }} />
      </Form.Item>
    </Input.Group>
  );
};

export default SelectPhone;
