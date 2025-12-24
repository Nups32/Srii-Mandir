import { AutoComplete, Input } from "antd";
import { useState } from "react";

export default function LocationSearch ({ form }: any) {
  const [options, setOptions] = useState([]);

  const searchCity = async (value: any) => {
    if (!value) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`
    );
    const data = await res.json();
    console.log(data);
    setOptions(
      data.map((item: any) => ({
        value: item.display_name,
        lat: item.lat,
        lon: item.lon
      }))
    );
  };

  const onSelect = (value: any, option: any) => {
    form.setFieldsValue({
      place: value,
      lat: option.lat,
      lon: option.lon
    });
  };

  return (
    <AutoComplete
      options={options}
      onSearch={searchCity}
      onSelect={onSelect}
    >
      <Input size="large" placeholder="Type city name" />
    </AutoComplete>
  );
};