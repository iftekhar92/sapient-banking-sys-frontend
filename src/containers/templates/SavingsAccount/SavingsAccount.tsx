import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Button from "../../../components/atoms/Button/Button";
import { Content } from "../../../components/molecules/styled/Content";
import Search from "../../../components/organisms/search/Search";
import Table from "../../../components/organisms/Table/Table";
import Pagination from "../../../components/atoms/Pagination/Pagination";
import { SAVINGS_ACCOUNT_LIST } from "../../../constants/Query";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { ON_CLOSE_MODAL, ON_OPEN_MODAL } from "../../../constants";
import { modal } from "../../../libs/initialState";
import { DELETE_SAVINGS_ACCOUNT } from "../../../constants/Mutation";
import { nameTypeSearch } from "../../../propTypes/propTypes";
import settings from "../../../theme/settings";

const theader = ["Name", "Required Amount", "Status", "Actions"];
const tbodyFields = ["name", "requiredAmount", "status", "action"];
const limit = settings.pageNumber;

const SavingsAccount: React.FC = () => {
  const [status, dispatch] = useStateValue();
  const [severity, setSeverity] = useState(
    status?.message?.severity || "error"
  );
  const [message, setMessage] = useState<any>(status?.message?.message || "");
  const [isHiddenSearch, setHiddenSearch] = useState(false);
  const [search, setSearch] = useState<nameTypeSearch>({
    name: "",
    status: "",
  });
  const [records, setRecords] = useState({ arrData: [], pageCount: 0 });
  const [savingsAccountList, { loading, data, error }] = useLazyQuery(SAVINGS_ACCOUNT_LIST);
  const [removeSavingsAccount, { loading: r_loading, error: r_error, data: r_data }] =
    useMutation(DELETE_SAVINGS_ACCOUNT);

  // Close the modal
  const onCloseModal = () => {
    dispatch({
      type: ON_CLOSE_MODAL,
      payload: modal,
    });
  };
  // Submit handler for confirm box
  const onConfirm = (event: React.MouseEvent<HTMLElement>) => {
    const {
      currentTarget: {
        dataset: { resource },
      },
    } = event;
    removeSavingsAccount({
      variables: { input: { _id: resource } },
    });
    onCloseModal();
  };

  // Build Modal buttons
  const ModalButton = (buttonProps: { resource: string }) => (
    <>
      <Button
        buttonType="primary"
        dataSetResource={buttonProps.resource}
        callback={onConfirm}
      >
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
    const {
      currentTarget: {
        dataset: { resource, actionType },
      },
    } = event;
    if (actionType === "remove") {
      dispatch({
        type: ON_OPEN_MODAL,
        payload: {
          isOpen: true,
          isCloseIcon: false,
          content: "Are you want to sure?",
          buttons: <ModalButton resource={resource} />,
          onClose: onCloseModal
        },
      });
    }
  };

  // Retrive data
  const retriveData = useCallback(
    (offset: number, searchData: nameTypeSearch) => {
      savingsAccountList({
        variables: {
          input: {
            pageLimit: limit,
            pageNo: offset,
            search: searchData,
          },
        },
      });
    },
    [savingsAccountList]
  );

  // Get Income list response
  useEffect(() => {
    if (!loading && data && !error) {
      const { response, total } = data.savingsAccountList;
      setRecords(() => ({
        pageCount: Math.ceil(total / limit),
        arrData: response,
      }));
    }
  }, [loading, data, error, setRecords, setSeverity, setMessage]);

  // Page handler
  const pageHandler = (data: { selected: number }) => {
    const { selected } = data;
    retriveData(selected, search);
  };

  // Search handler
  const onSubmitHandler = (data: nameTypeSearch) => {
    setSearch(data);
    retriveData(0, data);
  };

  // Reset Search handler
  const reset = () => {
    setSearch({ name: "", status: "" });
    retriveData(0, { name: "", status: "" });
  };

  // Call After page loading
  useEffect(() => {
    retriveData(0, search);
  }, [retriveData]); /* eslint-disable-line */

  // Response for deleting record
  useEffect(() => {
    if (!r_loading && !r_error && r_data) {
      const response = r_data.removeSavingsAccount;
      setSeverity(response.severity);
      setMessage(response.message);
      if (!response.hasError) {
        retriveData(0, search);
      }
    }
  }, [
    r_loading,
    r_error,
    r_data,
    setSeverity,
    setMessage,
    retriveData,
    search
  ]);
  return (
    <Content>
      <SubHeaderAction
        title="Savings Account"
        searchToggleAction={() => setHiddenSearch(!isHiddenSearch)}
        addNewLink="/admin/savings-account/create"
        addNewBtnTxt="Add New"
        searchBtnTxt={isHiddenSearch ? "Hide search" : "Show search"}
      />
      {isHiddenSearch && (
        <Search
          onSubmitHandler={onSubmitHandler}
          reset={reset}
          formName="nameStatus"
        />
      )}
      {records.arrData.length > 0 && (
        <Pagination pageCount={records.pageCount} onPageChange={pageHandler} />
      )}
      {message && <Message customClass={severity}>{message}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Table
          theader={theader}
          tbodyFields={tbodyFields}
          tbody={records.arrData}
          onClickHandler={actions}
        />
      )}
    </Content>
  );
};

export default SavingsAccount;
