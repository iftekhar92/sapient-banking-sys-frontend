import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import NoHeaderNoFooter from "../../organisms/Layouts/NoHeaderNoFooter";
import { AdminWithoutLogInContainer } from "../../../components/molecules/styled/AdminWithoutLogInContainer";
import Card from "../../../components/molecules/styled/Card";
import Form from "../../organisms/Login/Form";
import { loginSchema } from "../../../libs/schema";
import { LOGIN } from "../../../constants/Query";
import { isValidated, setCookie } from "../../../utils/utils";

type Inputs = {
  email: string;
  password: string | number;
};

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [login, { loading, error, data }] = useLazyQuery(LOGIN);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });

  // Form submit handler
  const onSubmit = (input: Inputs) => {
    login({ variables: { input } });
  };

  // Response: Form submit handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.login;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        setCookie(process.env.REACT_APP_TOKEN_KEY, response.token);
        navigate("/admin/dashboard");
        navigate(0);
      }
    }
  }, [loading, error, data, setError, navigate]);

  return (
    <NoHeaderNoFooter>
      <AdminWithoutLogInContainer alignCenter={true}>
        <Card maxWidth="300px">
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            message={message}
            severity={severity}
            errors={errors}
          />
        </Card>
      </AdminWithoutLogInContainer>
    </NoHeaderNoFooter>
  );
};

export default LogIn;
