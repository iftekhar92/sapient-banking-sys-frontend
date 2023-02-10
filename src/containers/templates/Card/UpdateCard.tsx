import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/Card/Form";
import { cardInputTypes } from "../../../propTypes/propTypes";
import {
  FIND_CARD_BY_ID,
  FIND_ACCOUNT_TYPES,
  FIND_CARD_TYPES,
  FIND_ALL_INCOMES,
} from "../../../constants/Query";
import { EDIT_CARD } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { cardSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { ACTIVE_INACTIVE_LIST, SET_MESSAGE } from "../../../constants";

const UpdateCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [cardTypeList, setCardTypeList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [updateCard, { loading, error, data }] = useMutation(EDIT_CARD);
  const [findCardById, { loading: f_loading, error: f_error, data: f_data }] =
    useLazyQuery(FIND_CARD_BY_ID);
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
    setValue,
    formState: { errors },
  } = useForm<cardInputTypes>({
    resolver: yupResolver(cardSchema),
  });

  // Loads default data
  useEffect(() => {
    findCardById({ variables: { input: { _id: id } } });
  }, [id, findCardById]);

  // Response: Loads data
  useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const response = f_data.findCardById;
      if (response.hasError || !response.response) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: "Record does not exist!",
            severity: "error bg",
          },
        });
        navigate("/admin/cards");
      } else {
        const {
          name,
          fkIncomeId,
          fkAccountTypeId,
          fkCardTypeId,
          validityNoOfYear,
          limitAmount,
          annualCharge,
          status,
        } = response.response;
        setValue("name", name);
        setValue("fkIncomeId", fkIncomeId);
        setValue("fkAccountTypeId", fkAccountTypeId);
        setValue("fkCardTypeId", fkCardTypeId);
        setValue("validityNoOfYear", validityNoOfYear);
        setValue("limitAmount", limitAmount);
        setValue("annualCharge", annualCharge);
        setValue("status", status);
        findAllAccounts({
          variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
        });
        findAllCardTypes({
          variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
        });
        findAllIncomes({
          variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
        });
      }
    }
  }, [
    f_loading,
    f_error,
    f_data,
    navigate,
    setValue,
    dispatch,
    findAllAccounts,
    findAllCardTypes,
    findAllIncomes,
  ]);

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
    updateCard({
      variables: {
        input: {
          ...values,
          _id: id,
          validityNoOfYear: parseInt(values.validityNoOfYear, 10),
          limitAmount: parseInt(values.limitAmount, 10),
          annualCharge: parseInt(values.annualCharge, 10),
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateCard;
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
        title="Update Card"
        addNewLink="/admin/cards"
        addNewBtnTxt="Back"
      />
      {message && <Message customClass={severity}>{message}</Message>}
      {incomeList.length === 0 ||
      accountTypeList.length === 0 ||
      cardTypeList.length === 0 ? (
        <Loader />
      ) : (
        <Form
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          incomeList={incomeList}
          accountTypeList={accountTypeList}
          cardTypeList={cardTypeList}
        />
      )}
    </Content>
  );
};

export default UpdateCard;
