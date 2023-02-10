import React, { useRef, useState } from "react";
import moment from "moment";

import DateRange from "../../atoms/DateRange/DateRange";
import Button from "../../atoms/Button/Button";
import Message from "../../molecules/Message/Message";
import SubContainer from "../../molecules/styled/SubContainer";
import { dateType } from "../../../propTypes/propTypes";

type Props = {
  reset: (event: React.MouseEvent<any>) => void;
  endDate?: any;
  startDate?: any;
  onSubmitHandler: (data: dateType) => void;
};

const initialRef: any = null;

const DateType: React.FC<Props> = ({
  onSubmitHandler,
  reset,
  startDate = null,
  endDate = null,
}) => {
  const [severity] = useState("error");
  const [message] = useState("");
  const onRef = useRef(initialRef);

  const onSubmit = (event: React.MouseEvent<any>) => {
    event?.preventDefault();
    onSubmitHandler({
      startDate: onRef.current.startDate
        ? moment(onRef.current.startDate).format("YYYY-MM-DD")
        : "",
      endDate: onRef.current.endDate
        ? moment(onRef.current.endDate).format("YYYY-MM-DD")
        : "",
    });
  };

  return (
    <>
      <form>
        {message && <Message customClass={severity}>{message}</Message>}
        <DateRange
          onRef={onRef}
          dateFormat="yyyy-MM-dd"
          defaultValue={null}
          showTimeSelect={false}
          customClass="medium"
          defaultStartDate={startDate}
          defaultEndDate={endDate}
        />
        <SubContainer isAlwaysVertical={false}>
          <Button buttonType="primary" callback={onSubmit}>
            Search
          </Button>
          <Button buttonType="secondary" callback={reset}>
            Clear search
          </Button>
        </SubContainer>
      </form>
    </>
  );
};

export default DateType;
