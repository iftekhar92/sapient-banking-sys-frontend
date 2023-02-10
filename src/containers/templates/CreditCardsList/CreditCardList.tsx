import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Pagination from "../../../components/atoms/Pagination/Pagination";
import { Content } from "../../../components/molecules/styled/Content";
import Search from "../../../components/organisms/search/Search";
import Table from "../../../components/organisms/Table/Table";
import {
  ACCOUNT_PAYMENT_HISTORY,
  CREDIT_CARD_ACCOUNTS,
} from "../../../constants/Query";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { dateType } from "../../../propTypes/propTypes";
import settings from "../../../theme/settings";
import SubContainer from "../../../components/molecules/styled/SubContainer";
import Title from "../../../components/atoms/Title/Title";
import Hr from "../../../components/atoms/Hr/Hr";
import { CREDIT_CARD } from "../../../constants";

const theader = [
  "Action",
  "Card Number",
  "Name",
  "Limit",
  "Available Amount",
  "Outstanding Amount",
  "Status",
  "Start On",
  "Expiry On",
];
const tbodyFields = [
  "_id",
  "selection",
  "cardNumber",
  "cardName",
  "limitAmount",
  "availableAmount",
  "outstandingAmount",
  "status",
  "startDate",
  "expiryDate",
];
const txnTheader = [
  "Txn Id",
  "Txn Type",
  "A/c | Card Number",
  "Account Type",
  "Amount",
  "Remark",
  "Status",
  "Paymant On",
];
const txnTbodyFields = [
  "txnId",
  "txnType",
  "accountNumber",
  "accountInfo",
  "amount",
  "remark",
  "status",
  "paymentAt",
];
const limit = settings.pageNumber;

const CreditCards: React.FC = () => {
  const [status] = useStateValue();
  const [accounts, setAccounts] = useState([]);
  const [severity, setSeverity] = useState(
    status?.message?.severity || "error"
  );
  const [message, setMessage] = useState<any>(status?.message?.message || "");
  const [severitySearch, setSeveritySearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [isHiddenSearch, setHiddenSearch] = useState(false);
  const [search, setSearch] = useState<dateType>({
    startDate: "",
    endDate: "",
  });
  const [records, setRecords] = useState({ arrData: [], pageCount: 0 });
  const [creditCardsAccount, { loading, data, error }] =
    useLazyQuery(CREDIT_CARD_ACCOUNTS);
  const [
    transactionHistory,
    { loading: h_loading, error: h_error, data: h_data },
  ] = useLazyQuery(ACCOUNT_PAYMENT_HISTORY);

  const form = useForm({
    defaultValues: {
      selection: "",
    },
    mode: "onChange",
  });
  const { register } = form;

  // Retrive data
  const retriveData = useCallback(
    (offset: number, selectedAccount: string, searchData: dateType) => {
      transactionHistory({
        variables: {
          input: {
            key: "fkCardId",
            value: selectedAccount,
            type: CREDIT_CARD,
            pageLimit: limit,
            pageNo: offset,
            search: searchData,
          },
        },
      });
    },
    [transactionHistory]
  );

  // Loads savings account
  useEffect(() => {
    creditCardsAccount({ variables: { input: { status: "" } } });
  }, [creditCardsAccount]);

  // Response:
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.creditCardsAccount;
      setSeverity(response.severity);
      setMessage(response.message);
      if (response.response.length > 0) {
        setAccounts(response.response);
        form.setValue("selection", response.response[0]._id);
        retriveData(0, response.response[0]._id, search);
      }
    }
  }, [ loading, data, error, form, setAccounts, retriveData]); /* eslint-disable-line */

  // Get History list response
  useEffect(() => {
    if (!h_loading && !h_error && h_data) {
      const { response, total } = h_data.transactionHistory;
      setRecords(() => ({
        pageCount: Math.ceil(total / limit),
        arrData: response,
      }));
    }
  }, [h_loading, h_error, h_data, setRecords]);

  // Page handler
  const pageHandler = (data: { selected: number }) => {
    const { selected } = data;
    retriveData(selected, form.getValues("selection"), search);
  };

  // Search handler
  const onSubmitHandler = (data: dateType) => {
    if (!data.startDate || !data.endDate) {
      setMessageSearch("Please start and end date cannot be blanks");
      setSeveritySearch("error");
    } else {
      setMessageSearch("");
      setSeveritySearch("");
      setSearch(data);
      retriveData(0, form.getValues("selection"), data);
    }
  };

  // Reset Search handler
  const reset = (event?: React.MouseEvent<any>) => {
    event?.preventDefault();
    setSearch({ startDate: "", endDate: "" });
    setHiddenSearch(!isHiddenSearch)
    retriveData(0, form.getValues("selection"), { startDate: "", endDate: "" });
  };

  const onChangeHandler = (currentVal: string) => {
    retriveData(0, currentVal, { startDate: "", endDate: "" });
  };

  return (
    <Content>
      <SubHeaderAction
        title="Credit Card Accounts"
        searchToggleAction={() => setHiddenSearch(!isHiddenSearch)}
        addNewLink="/admin/open-account"
        addNewBtnTxt="Add New"
        searchBtnTxt={isHiddenSearch ? "Hide search" : "Show search"}
      />
      {isHiddenSearch && (
        <Search
          onSubmitHandler={onSubmitHandler}
          reset={(event?: React.MouseEvent<any>) => reset(event)}
          formName="dateType"
          startDate={search.startDate}
          endDate={search.endDate}
          severity={severitySearch}
          message={messageSearch}
        />
      )}
      {message && <Message customClass={severity}>{message}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Table
          theader={theader}
          tbodyFields={tbodyFields}
          tbody={accounts}
          register={register}
          onChangeHandler={onChangeHandler}
        />
      )}
      <SubContainer isAlwaysVertical={true} className="margin-bottom">
        <Title>Payment History</Title>
        <Hr heightType="wide" widthType="small" />
      </SubContainer>
      <Table
        theader={txnTheader}
        tbodyFields={txnTbodyFields}
        tbody={records.arrData}
      />
      {records.arrData.length > 0 && (
        <Pagination pageCount={records.pageCount} onPageChange={pageHandler} />
      )}
    </Content>
  );
};

export default CreditCards;
