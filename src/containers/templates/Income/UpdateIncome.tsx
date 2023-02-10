import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/Income/Form";
import { incomeInputTypes } from "../../../propTypes/propTypes";
import { FIND_INCOME_BY_ID } from "../../../constants/Query";
import { EDIT_INCOME } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { incomeSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";

const UpdateIncome: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [loader, setLoader] = useState(true);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [updateIncome, { loading, error, data }] = useMutation(EDIT_INCOME);
  const [findIncomeById, { loading: f_loading, error: f_error, data: f_data }] =
    useLazyQuery(FIND_INCOME_BY_ID);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<incomeInputTypes>({
    resolver: yupResolver(incomeSchema),
  });

  // Loads default data
  useEffect(() => {
    findIncomeById({ variables: { input: { _id: id } } });
  }, [id, findIncomeById]);

  // Response: Loads data
  useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const response = f_data.findIncomeById;
      if (response.hasError || !response.response) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message:'Record does not exist!',
            severity: 'error bg'
          },
        });
        navigate("/admin/income");
      } else {
        const { name, from, to, status } = response.response;
        setValue('name', name)
        setValue('from', from)
        setValue('to', to)
        setValue('status', status)
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader, setValue, dispatch]);

  // Form submit Handler
  const onSubmit = (values: incomeInputTypes) => {
    updateIncome({
      variables: {
        input: {
          ...values,
          _id: id,
          from: parseInt(values.from, 10),
          to: parseInt(values.to),
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateIncome;
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
  }, [loading, error, data, setSeverity, setMessage, navigate,dispatch, setError]);

  return (
    <Content>
      <SubHeaderAction
        title="Update Annual Income"
        addNewLink="/admin/income"
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

export default UpdateIncome;
