import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/Card/Form";
import { cardInputTypes } from "../../../propTypes/propTypes";
import { CREATE_CARD } from "../../../constants/Mutation";
import {
  FIND_ACCOUNT_TYPES,
  FIND_ALL_INCOMES,
  FIND_CARD_TYPES,
} from "../../../constants/Query";
import { isValidated } from "../../../utils/utils";
import { cardSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { ACTIVE_INACTIVE_LIST, SET_MESSAGE } from "../../../constants";

const CreateCard: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [cardTypeList, setCardTypeList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [createCard, { loading, error, data }] = useMutation(CREATE_CARD);
  const [
    findAllAccounts,
    { loading: i_loading, error: i_error, data: i_data },
  ] = useLazyQuery(FIND_ACCOUNT_TYPES);
  const [
    findAllCardTypes,
    { loading: c_loading, error: c_error, data: c_data },
  ] = useLazyQuery(FIND_CARD_TYPES);
  const [
    findAllIncomes,
    { loading: in_loading, error: in_error, data: in_data },
  ] = useLazyQuery(FIND_ALL_INCOMES);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<cardInputTypes>({ resolver: yupResolver(cardSchema) });

  // Fetch Account types and Card types
  useEffect(() => {
    findAllAccounts({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
    findAllCardTypes({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
    findAllIncomes({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
  }, [findAllAccounts, findAllCardTypes, findAllIncomes]);
  // Response: Account types
  useEffect(() => {
    if (!i_loading && !i_error && i_data) {
      const { response } = i_data.findAllAccounts;
      setAccountTypeList(() =>
        response.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
    }
  }, [i_loading, i_error, i_data, setAccountTypeList]);
  // Response: Card types
  useEffect(() => {
    if (!c_loading && !c_error && c_data) {
      const { response } = c_data.findAllCardTypes;
      setCardTypeList(() =>
        response.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
    }
  }, [c_loading, c_error, c_data, setCardTypeList]);
  // Response: All Income list
  useEffect(() => {
    if (!in_loading && !in_error && in_data) {
      const { response } = in_data.findAllIncomes;
      setIncomeList(() =>
        response.map((x: { range: string; _id: string }) => ({
          label: x.range,
          value: x._id,
        }))
      );
    }
  }, [in_loading, in_error, in_data, setIncomeList]);

  // Form submit Handler
  const onSubmit = (values: cardInputTypes) => {
    createCard({
      variables: {
        input: {
          ...values,
          limitAmount: parseInt(values.limitAmount, 10),
          annualCharge: parseInt(values.annualCharge, 10),
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createCard;
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
        navigate("/admin/cards");
      }
    }
  }, [
    loading,
    error,
    data,
    setSeverity,
    setMessage,
    navigate,
    dispatch,
    setError,
  ]);

  return (
    <Content>
      <SubHeaderAction
        title="Create New Card"
        addNewLink="/admin/cards"
        addNewBtnTxt="Back"
      />
      {message && <Message customClass={severity}>{message}</Message>}
      <Form
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        incomeList={incomeList}
        accountTypeList={accountTypeList}
        cardTypeList={cardTypeList}
      />
    </Content>
  );
};

export default CreateCard;
