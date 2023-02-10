import React from "react";

import SelectStyle from "./Select.Style";
import { optionsObj } from "../../../propTypes/propTypes";

type Props = {
  customClass?: string;
  rest?: any;
  defaultData: optionsObj;
  options: optionsObj[];
};

const Select: React.FC<Props> = ({
  customClass,
  rest,
  options,
  defaultData,
}) => {
  return (
    <SelectStyle className={`form-control ${customClass}`} {...rest}>
      {defaultData.label && (
        <option value={defaultData.value}>{defaultData.label}</option>
      )}
      {options.map((item: optionsObj, idx:number) => (
        <option key={`${item.label}-idx`} value={item.value}>
          {item.label}
        </option>
      ))}
    </SelectStyle>
  );
};

Select.defaultProps = {
  customClass: "",
  rest: {},
  options: [],
  defaultData: { value: "", label: "Select..." },
};

export default Select;
