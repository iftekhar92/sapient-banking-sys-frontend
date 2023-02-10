import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/OpenAccount/Form";
import { openAccountTypes } from "../../../propTypes/propTypes";
import {
  FIND_ACCOUNT_TYPES,
  FIND_SAVINGS_ACCOUNTS,
  FIND_AVAILABLE_CARDS,
} from "../../../constants/Query";
import { isValidated } from "../../../utils/utils";
import { openAccountSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import {
  ACTIVE_INACTIVE_LIST,
  CREDIT_CARD,
  SAVINGS,
  SET_MESSAGE,
} from "../../../constants";
import { OPEN_ACCOUNT } from "../../../constants/Mutation";

const OpenAccount: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [savingsAccountList, setCategoryList] = useState([]);
  const [cardList, setCardList] = useState<any>([]);
  const [cards, setCards] = useState({ creditCard: [], debitCard: [] });
  const [openAccount, { loading, error, data }] = useMutation(OPEN_ACCOUNT);

  const [
    findAllAccounts,
    { loading: ac_loading, error: ac_error, data: ac_data },
  ] = useLazyQuery(FIND_ACCOUNT_TYPES);
  const [
    findAllSavingsAccount,
    { loading: ca_loading, error: ca_error, data: ca_data },
  ] = useLazyQuery(FIND_SAVINGS_ACCOUNTS);
  const [
    findAvailableCards,
    { loading: c_loading, error: c_error, data: c_data },
  ] = useLazyQuery(FIND_AVAILABLE_CARDS);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<openAccountTypes>({ resolver: yupResolver(openAccountSchema) });

  // Fetch Account types and Card types
  useEffect(() => {
    findAllAccounts({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
    findAllSavingsAccount({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
    findAvailableCards({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
  }, [findAllAccounts, findAllSavingsAccount, findAvailableCards]);
  // Response: Account types
  useEffect(() => {
    if (!ac_loading && !ac_error && ac_data) {
      const { response } = ac_data.findAllAccounts;
      setAccountTypeList(() =>
        response.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: `${x._id}?${x.name.toLowerCase()}`,
        }))
      );
    }
  }, [ac_loading, ac_error, ac_data, setAccountTypeList]);
  // Response: Saving Account type
  useEffect(() => {
    if (!ca_loading && !ca_error && ca_data) {
      const { response } = ca_data.findAllSavingsAccount;
      setCategoryList(() =>
        response.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
    }
  }, [ca_loading, ca_error, ca_data, setCategoryList]);
  // Response: All Cards
  useEffect(() => {
    if (!c_loading && !c_error && c_data) {
      const { response } = c_data.findAvailableCards;
      setCards(response);
    }
  }, [c_loading, c_error, c_data, setCardList]);

  const isSavingsAc = useCallback(
    (currentVal = selectedAccount): boolean =>
      !!(
        currentVal && currentVal?.toLowerCase()?.includes(SAVINGS.toLowerCase())
      ),
    [selectedAccount]
  );

  // Form submit Handler
  const onSubmit = (values: openAccountTypes) => {
    let isError = true;
    let type;
    const {
      fkAccountTypeId: fkAccountType = "",
      fkSavingsAccountId = "",
      fkCardId = "",
    } = values;
    if (isSavingsAc()) {
      type = SAVINGS;
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
      type = CREDIT_CARD;
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
      const arrReq = fkAccountType.split("?");
      const input = {
        fkAccountTypeId: arrReq[0],
        fkSavingsAccountId,
        fkCardId,
        type,
      };
      openAccount({ variables: { input } });
    }
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.openAccount;
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
    loading,
    error,
    data,
    setSeverity,
    setMessage,
    setError,
    navigate,
    dispatch,
    isSavingsAc
  ]);

  const onChangeAccountType = (currentVal: string) => {
    setSelectedAccount(currentVal);
    let arrData = [];
    if (isSavingsAc(currentVal)) {
      arrData = cards.debitCard.map((item: { _id: string; name: string }) => ({
        value: item._id,
        label: item.name,
      }));
    } else {
      arrData = cards.creditCard.map((item: { _id: string; name: string }) => ({
        value: item._id,
        label: item.name,
      }));
    }
    setValue("fkSavingsAccountId", "");
    setValue("fkCardId", "");
    setCardList(arrData);
  };
  return (
    <Content>
      <SubHeaderAction title="Open New Account" />
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

export default OpenAccount;
