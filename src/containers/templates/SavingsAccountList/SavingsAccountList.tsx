import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Button from "../../../components/atoms/Button/Button";
import Title from "../../../components/atoms/Title/Title";
import Hr from "../../../components/atoms/Hr/Hr";
import Pagination from "../../../components/atoms/Pagination/Pagination";
import { Content } from "../../../components/molecules/styled/Content";
import { modal } from "../../../libs/initialState";
import Search from "../../../components/organisms/search/Search";
import Table from "../../../components/organisms/Table/Table";
import SubContainer from "../../../components/molecules/styled/SubContainer";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { dateType } from "../../../propTypes/propTypes";
import {
  ACCOUNT_PAYMENT_HISTORY,
  SAVINGS_ACCOUNT,
} from "../../../constants/Query";
import { REMOVE_ACCOUNTS_PAYMENT } from "../../../constants/Mutation";
import { ON_CLOSE_MODAL, ON_OPEN_MODAL, SAVINGS } from "../../../constants";
import settings from "../../../theme/settings";

const theader = ["Action", "A/c", "Types", "Amount", "Created On", "Status"];
const tbodyFields = [
  "_id",
  "selection",
  "accountNumber",
  "fkSavingsAccount",
  "availableAmount",
  "startDate",
  "status",
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

const SavingsAccount: React.FC = () => {
  const navigate = useNavigate();
  const [status, dispatch] = useStateValue();
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
  const [savingsAccount, { loading, data, error }] =
    useLazyQuery(SAVINGS_ACCOUNT);
  const [
    transactionHistory,
    { loading: h_loading, error: h_error, data: h_data },
  ] = useLazyQuery(ACCOUNT_PAYMENT_HISTORY);
  const [
    removeAccountAndPaymentHistory,
    { loading: r_loading, error: r_error, data: r_data },
  ] = useMutation(REMOVE_ACCOUNTS_PAYMENT);

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
            key: "fkSavingsAccountId",
            value: selectedAccount,
            type: SAVINGS,
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
    savingsAccount({ variables: { input: { status: "" } } });
  }, [savingsAccount]);

  // Response:
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.savingsAccount;
      setSeverity(response.severity);
      setMessage(response.message);
      if (response.response.length > 0) {
        setAccounts(response.response);
        form.setValue("selection", response.response[0]._id);
        retriveData(0, response.response[0]._id, search);
      }
    }
  }, [ loading, data, error, form, setAccounts,retriveData]); /* eslint-disable-line */

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
    setHiddenSearch(!isHiddenSearch);
    retriveData(0, form.getValues("selection"), { startDate: "", endDate: "" });
  };

  const onChangeHandler = (currentVal: string) => {
    retriveData(0, currentVal, { startDate: "", endDate: "" });
  };

  // Close the modal
  const onCloseModal = () => {
    dispatch({
      type: ON_CLOSE_MODAL,
      payload: modal,
    });
  };
  // Submit handler for confirm box
  const onConfirm = () => {
    removeAccountAndPaymentHistory();
    onCloseModal();
  };
  // Response for deleting record
  useEffect(() => {
    if (!r_loading && !r_error && r_data) {
      const response = r_data.removeAccountAndPaymentHistory;
      setSeverity(response.severity);
      setMessage(response.message);
      if (!response.hasError) {
        navigate(0)
      }
    }
  }, [r_loading, r_error, r_data, navigate]);

  // Build Modal buttons
  const ModalButton = () => (
    <>
      <Button buttonType="primary" callback={onConfirm}>
        Confirm
      </Button>
      <Button buttonType="secondary" callback={onCloseModal}>
        Cancel
      </Button>
    </>
  );

  // Click Hendler on Action
  const actions = (event: React.MouseEvent<any>) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    dispatch({
      type: ON_OPEN_MODAL,
      payload: {
        isOpen: true,
        isCloseIcon: false,
        content: "Are you want to sure?",
        buttons: <ModalButton />,
        onClose: onCloseModal,
      },
    });
  };

  const additionalAction = () => (
    <Button buttonType="primary" callback={actions}>
      Clear Account Info
    </Button>
  );

  return (
    <Content>
      <SubHeaderAction
        title="Savings Account"
        searchToggleAction={() => setHiddenSearch(!isHiddenSearch)}
        addNewLink="/admin/open-account"
        addNewBtnTxt="Add New"
        searchBtnTxt={isHiddenSearch ? "Hide search" : "Show search"}
        additionalAction={additionalAction}
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

export default SavingsAccount;
