import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/ChangePassword/Form";
import { changePasswordTypes } from "../../../propTypes/propTypes";
import { CHANGE_PASSWORD } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { changePasswordSchema } from "../../../libs/schema";

const ChangePassword: React.FC = () => {
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [changePassword, { loading, error, data }] =
    useMutation(CHANGE_PASSWORD);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<changePasswordTypes>({
    resolver: yupResolver(changePasswordSchema),
  });

  // Form submit Handler
  const onSubmit = (input: changePasswordTypes) => {
    changePassword({ variables: { input } });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.changePassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        resetField("oldPassword");
        resetField("password");
        resetField("confirmPassword");
      }
    }
  }, [loading, error, data, setSeverity, setMessage, setError, resetField]);

  return (
    <Content>
      <SubHeaderAction title="Change Password" addNewLink="" addNewBtnTxt="" />
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

export default ChangePassword;
