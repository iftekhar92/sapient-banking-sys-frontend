import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/Income/Form";
import { incomeInputTypes } from "../../../propTypes/propTypes";
import { CREATE_INCOME } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { incomeSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";

const CreateIncome: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [createIncome, { loading, error, data }] = useMutation(CREATE_INCOME);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<incomeInputTypes>({ resolver: yupResolver(incomeSchema) });

  // Form submit Handler
  const onSubmit = (values: incomeInputTypes) => {
    createIncome({
      variables: {
        input: {
          ...values,
          from: parseInt(values.from, 10),
          to: parseInt(values.to),
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createIncome;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message:response.message,
            severity: response.severity
          },
        });
        navigate("/admin/income");
      }
    }
  }, [loading, error, data, setSeverity, setMessage, navigate, dispatch, setError]);

  return (
    <Content>
      <SubHeaderAction
        title="Create New Annual Income"
        addNewLink="/admin/income"
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

export default CreateIncome;
