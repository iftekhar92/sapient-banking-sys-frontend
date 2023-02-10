import React from "react";
import Switch, { Case, Default } from "react-switch-case";

import SearchStyle from "./Search.Style";
import Message from "../../molecules/Message/Message";
import NameStatus from "./NameStatus";
import DateType from "./DateType";

type Props = {
  formName: string;
  reset: (event?: React.MouseEvent<any>) => void;
  endDate?: any;
  startDate?: any;
  severity?: string;
  message?: string;
  onSubmitHandler: (data: any) => void;
};

const Search: React.FC<Props> = ({
  reset,
  formName,
  onSubmitHandler,
  endDate,
  startDate,
  severity,
  message,
}) => {
  return (
    <SearchStyle>
      {message && <Message customClass={severity}>{message}</Message>}
      <Switch condition={formName}>
        <Case value="nameStatus">
          <NameStatus onSubmitHandler={onSubmitHandler} reset={reset} />
        </Case>
        <Case value="dateType">
          <DateType
            endDate={endDate}
            startDate={startDate}
            onSubmitHandler={onSubmitHandler}
            reset={reset}
          />
        </Case>
        <Default>
          <span></span>
        </Default>
      </Switch>
    </SearchStyle>
  );
};

Search.defaultProps = {
  reset: () => {},
  formName: "",
  onSubmitHandler: () => {},
  endDate: "",
  startDate: "",
  severity: "",
  message: "",
};

export default Search;
