import { Form, Select } from 'antd';
import Image from 'next/image';
import { FocusEvent, useEffect, useState } from 'react';

const { Option } = Select;

type CountriesType = {
  name: string;
  flag: string;
};

const SelectCountry = ({ name, label, multiple = false }) => {
  const [countries, setCountries] = useState<CountriesType[]>([]);
  const [countriesStor, setCountriesStor] = useState<CountriesType[]>([]);

  const handleFetchCountries = (e: FocusEvent<HTMLElement, Element> | null) => {
    if (countries.length === 0) {
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
    if (value?.length === 0) {
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
    handleFetchCountries(null);
  }, []);

  return (
    <Form.Item
      name={name}
      label={label}
      help={multiple ? 'أتركه فارغا للسماح بجميع الدول' : ''}
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
  );
};

export default SelectCountry;
