import React, { useImperativeHandle, useState } from "react";
import DateTimePicker from "react-datepicker";

import { datePickerType } from "../../../propTypes/propTypes";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker: React.FC<datePickerType> = ({
  onRef,
  dateFormat,
  defaultValue,
  showTimeSelect,
  customClass,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(defaultValue);

  useImperativeHandle(onRef, () => ({ selectedDate }));

  return (
    <DateTimePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      showTimeSelect={showTimeSelect}
      dateFormat={dateFormat}
      className={`form-control ${customClass}`}
    />
  );
};

DatePicker.defaultProps = {
  dateFormat: "yyyy-MM-dd",
  showTimeSelect: false,
  customClass: "",
};

export default DatePicker;
