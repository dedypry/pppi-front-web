import { Radio, RadioGroup, SelectItem } from "@heroui/react";

import CustomInput from "@/components/form/custom-input";
import CustomSelect from "@/components/form/custom-select";
import { IFormHeader } from "@/interface/IForm";
import AllDistrictList from "@/components/regions/all-district";

interface Props {
  data: IFormHeader;
  value: any;
  setValue: (val: any) => void;
}
export default function TypeComponents({ data, value, setValue }: Props) {
  switch (data.type) {
    case "select":
      return (
        <CustomSelect
          label={data.title}
          labelPlacement="inside"
          placeholder={`Masukan ${data.title}`}
          selectedKeys={[value]}
          onSelectionChange={(val) => {
            const value = [...val][0];

            setValue(value);
          }}
        >
          {data.options.map((e) => (
            <SelectItem key={e.label}>{e.label}</SelectItem>
          ))}
        </CustomSelect>
      );
      break;

    case "radio":
      return (
        <RadioGroup label={data.title} value={value} onValueChange={setValue}>
          {data.options.map((e) => (
            <Radio key={e.label} value={e.label}>
              {e.label}
            </Radio>
          ))}
        </RadioGroup>
      );
      break;

    case "region":
      return (
        <AllDistrictList
          labelPlacement="inside"
          setValue={setValue}
          value={value}
        />
      );
      break;

    default:
      return (
        <CustomInput
          label={data.title}
          labelPlacement="inside"
          placeholder={`Masukan ${data.title}`}
          value={value}
          onValueChange={setValue}
        />
      );
      break;
  }
}
