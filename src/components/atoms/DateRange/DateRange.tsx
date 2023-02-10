import React, { useImperativeHandle, useState } from "react";
import DateTimePicker from "react-datepicker";
import { subMonths } from "date-fns";

import { datePickerType } from "../../../propTypes/propTypes";
import "react-datepicker/dist/react-datepicker.css";
import SubContainer from "../../molecules/styled/SubContainer";
import Label from "../Label/Label.Style";
import settings from "../../../theme/settings";

const DateRange: React.FC<datePickerType> = ({
  onRef,
  dateFormat,
  defaultStartDate,
  defaultEndDate,
  showTimeSelect,
  customClass,
}) => {
  const [startDate, setStartDate] = useState<any>(defaultStartDate);
  const [endDate, setEndDate] = useState<any>(defaultEndDate);

  useImperativeHandle(onRef, () => ({ startDate, endDate }));

  return (
    <>
      <SubContainer isAlwaysVertical={true}>
        <Label htmlFor="Start Date">Start Date</Label>
        <DateTimePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          minDate={subMonths(new Date(), settings.maxDateRangeTxn)}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          className={`form-control ${customClass}`}
        />
      </SubContainer>
      <SubContainer isAlwaysVertical={true}>
        <Label htmlFor="Start Date">End Date</Label>
        <DateTimePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          className={`form-control ${customClass}`}
        />
      </SubContainer>
    </>
  );
};

DateRange.defaultProps = {
  defaultStartDate: null,
  defaultEndDate: null,
  dateFormat: "yyyy-MM-dd",
  showTimeSelect: false,
  customClass: "",
};

export default DateRange;
