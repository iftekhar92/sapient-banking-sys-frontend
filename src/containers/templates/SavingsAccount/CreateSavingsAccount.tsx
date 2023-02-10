import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/SavingsAccount/Form";
import { savingsAccountTypes } from "../../../propTypes/propTypes";
import { CREATE_SAVINGS_ACCOUNT } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { savingsAccountSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";

const CreateSavingsAccount: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [createSavingsAccount, { loading, error, data }] = useMutation(
    CREATE_SAVINGS_ACCOUNT
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<savingsAccountTypes>({
    resolver: yupResolver(savingsAccountSchema),
  });

  // Form submit Handler
  const onSubmit = (values: savingsAccountTypes) => {
    createSavingsAccount({
      variables: {
        input: {
          ...values,
          requiredAmount: parseInt(values.requiredAmount, 10),
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createSavingsAccount;
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
        navigate("/admin/savings-account");
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
        title="Create New Savings Account"
        addNewLink="/admin/savings-account"
        addNewBtnTxt="Back"
      />
      {message && <Message customClass={severity}>{message}</Message>}
      <Form
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </Content>
  );
};

export default CreateSavingsAccount;
