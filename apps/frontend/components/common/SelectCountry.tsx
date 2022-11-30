import Image from 'next/image';
import { Form, Select } from 'antd';
import { Logger } from '@/utils/app';
import { UsersActions } from '@/valtio/user.state';
import { FocusEvent, useEffect, useState } from 'react';

const { Option } = Select;

type CountriesType = {
  label: string;
  code: string;
  flag?: string;
  phone?: string;
};

const SelectCountry = ({ name, label, multiple = false }) => {
  const [countries, setCountries] = useState<CountriesType[]>([]);
  const [countriesStor, setCountriesStor] = useState<CountriesType[]>([]);

  const handleFetchCountries = (e: FocusEvent<HTMLElement, Element> | null) => {
    if (countries.length === 0) {
      fetch('/api/data/countries')
        .then((res) => res.json())
        .then(({ data }) => {
          const c = data.map((country: CountriesType) => ({
            label: country.label,
            flag: country.flag,
          }));

          const phones = data.map((country: CountriesType) => ({
            phone: country.phone,
            flag: country.flag,
          }));
          setCountries(c);
          setCountriesStor(c);
          UsersActions.setPhoneCodes(phones);
        })
        .catch((e) => Logger.log(e));
    } else {
      setCountries(countriesStor);
    }
  };

  const handleChangeCountries = (value) => {
    if (value?.length === 0) {
      setCountries(countriesStor);
    }
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      setCountries(
        countriesStor?.filter((country) =>
          country.label.toLowerCase().match(newValue.toLowerCase())
        )
      );
    } else {
      setCountries(countriesStor);
    }
  };

  useEffect(() => {
    handleFetchCountries(null);
  }, []);

  return (
    <Form.Item
      name={name}
      label={label}
      help={multiple ? 'أتركه فارغا للسماح بجميع الدول' : ''}
      rules={[{ required: !multiple, message: 'يرجى تحديد بلد جنسيتك' }]}
    >
      <Select
        mode={multiple ? 'multiple' : null}
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
          <Option key={country.label} value={country.label}>
            <Image
              loading="lazy"
              width="20"
              height="12"
              src={country.flag}
              alt={country.label}
            />
            <b style={{ margin: '0 5px', display: 'inline-block' }}>
              {country.label}
            </b>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectCountry;
