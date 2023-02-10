import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/NameStatusForm/Form";
import { nameStatusInputTypes } from "../../../propTypes/propTypes";
import { FIND_ACCOUNT_TYPE_BY_ID } from "../../../constants/Query";
import { EDIT_ACCOUNT_TYPE } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { nameStatusInputSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";

const UpdateAccountType: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [loader, setLoader] = useState(true);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [updateAccountType, { loading, error, data }] =
    useMutation(EDIT_ACCOUNT_TYPE);
  const [
    findAccountTypeById,
    { loading: f_loading, error: f_error, data: f_data },
  ] = useLazyQuery(FIND_ACCOUNT_TYPE_BY_ID);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<nameStatusInputTypes>({
    resolver: yupResolver(nameStatusInputSchema),
  });

  // Loads default data
  useEffect(() => {
    findAccountTypeById({ variables: { input: { _id: id } } });
  }, [id, findAccountTypeById]);

  // Response: Loads data
  useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const response = f_data.findAccountTypeById;
      if (response.hasError || !response.response) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: "Record does not exist!",
            severity: "error bg",
          },
        });
        navigate("/admin/account-type");
      } else {
        const { name, status } = response.response;
        setValue("name", name);
        setValue("status", status);
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader, setValue, dispatch]);

  // Form submit Handler
  const onSubmit = (values: nameStatusInputTypes) => {
    updateAccountType({
      variables: {
        input: {
          ...values,
          _id: id,
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateAccountType;
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
        navigate("/admin/account-type");
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
        title="Update Account Type"
        addNewLink="/admin/account-type"
        addNewBtnTxt="Back"
      />
      {message && <Message customClass={severity}>{message}</Message>}
      {loader ? (
        <Loader />
      ) : (
        <Form
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      )}
    </Content>
  );
};

export default UpdateAccountType;
