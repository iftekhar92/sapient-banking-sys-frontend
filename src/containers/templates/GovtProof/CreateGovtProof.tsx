import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/NameStatusForm/Form";
import { nameStatusInputTypes } from "../../../propTypes/propTypes";
import { CREATE_PROOF_TYPE } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { nameStatusInputSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";

const CreateGovtProof: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [createProofType, { loading, error, data }] = useMutation(CREATE_PROOF_TYPE);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<nameStatusInputTypes>({ resolver: yupResolver(nameStatusInputSchema) });

  // Form submit Handler
  const onSubmit = (input: nameStatusInputTypes) => {
    createProofType({variables: { input} });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createProofType;
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
        navigate("/admin/govt-proof");
      }
    }
  }, [loading, error, data, setSeverity, setMessage, navigate, dispatch, setError]);

  return (
    <Content>
      <SubHeaderAction
        title="Create New Govt. Proof"
        addNewLink="/admin/govt-proof"
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

export default CreateGovtProof;
