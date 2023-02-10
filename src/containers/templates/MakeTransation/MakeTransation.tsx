import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/MakeTransaction/Form";
import { makeTransactionTypes } from "../../../propTypes/propTypes";
import { isValidated } from "../../../utils/utils";
import { makeTransactionSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SAVINGS, SET_MESSAGE } from "../../../constants";
import { ACCOUNT_DETAILS } from "../../../constants/Query";
import { MAKE_TRANSACTION } from "../../../constants/Mutation";

const MakeTransation: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [savingsAccountList, setSavingsAccountList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [fetchAccountDetails, { loading, error, data }] =
    useLazyQuery(ACCOUNT_DETAILS);
  const [
    makeTransaction,
    { loading: mt_loading, error: mt_error, data: mt_data },
  ] = useMutation(MAKE_TRANSACTION);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<makeTransactionTypes>({
    resolver: yupResolver(makeTransactionSchema),
  });

  // Fetch Account details
  useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);
  // Response: Account details
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.fetchAccountDetails;
      setSeverity(response.severity);
      setMessage(response.message);
      setAccountTypeList(() =>
        response.accountType.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: `${x._id}?${x.name.toLowerCase()}`,
        }))
      );
      setSavingsAccountList(() =>
        response.accounts.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
      setCardList(() =>
        response.cards.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
    }
  }, [
    loading,
    error,
    data,
    setSeverity,
    setMessage,
    setAccountTypeList,
    setSavingsAccountList,
    setCardList,
  ]);

  const isSavingsAc = useCallback(
    (currentVal = selectedAccount): boolean =>
      !!(
        currentVal && currentVal?.toLowerCase()?.includes(SAVINGS.toLowerCase())
      ),
    [selectedAccount]
  );

  // Form submit Handler
  const onSubmit = (values: makeTransactionTypes) => {
    let isError = true;
    const {
      txnType,
      fkAccountTypeId,
      fkCardId = "",
      fkSavingsAccountId = "",
      amount,
      remark = "",
    } = values;
    if (isSavingsAc()) {
      if (!fkSavingsAccountId) {
        setError("fkSavingsAccountId", {
          type: "manual",
          message: "Please select savings A/c",
        });
      } else {
        clearErrors("fkSavingsAccountId");
        isError = false;
      }
    } else {
      if (!fkCardId) {
        setError("fkCardId", {
          type: "manual",
          message: "Please select card",
        });
      } else {
        clearErrors("fkCardId");
        isError = false;
      }
    }
    if (!isError) {
      const arrReq = fkAccountTypeId.split("?");
      const input = {
        txnType,
        fkAccountTypeId: arrReq[0],
        fkSavingsAccountId,
        fkCardId,
        amount: parseInt(amount, 10),
        remark,
      };
      makeTransaction({ variables: { input } });
    }
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!mt_loading && !mt_error && mt_data) {
      const response = mt_data.makeTransaction;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: response.message,
            severity: response.severity,
          },
        });
        if (isSavingsAc()) {
          navigate("/admin/history/savings");
        } else {
          navigate("/admin/history/credit-cards");
        }
      }
    }
  }, [
    mt_loading,
    mt_error,
    mt_data,
    setSeverity,
    setMessage,
    setError,
    navigate,
    dispatch,
    isSavingsAc,
  ]);

  const onChangeAccountType = (currentVal: string) => {
    setSelectedAccount(currentVal);
    setValue("fkSavingsAccountId", "");
    setValue("fkCardId", "");
  };
  return (
    <Content>
      <SubHeaderAction title="Make Transaction" />
      {message && <Message customClass={severity}>{message}</Message>}
      <Form
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onChangeAccountType={onChangeAccountType}
        isSavingsAc={isSavingsAc}
        accountTypeList={accountTypeList}
        savingsAccountList={savingsAccountList}
        cardList={cardList}
      />
    </Content>
  );
};

export default MakeTransation;
