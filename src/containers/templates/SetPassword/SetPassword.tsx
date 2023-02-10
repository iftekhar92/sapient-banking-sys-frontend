import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";

import NoHeaderNoFooter from "../../organisms/Layouts/NoHeaderNoFooter";
import { AdminWithoutLogInContainer } from "../../../components/molecules/styled/AdminWithoutLogInContainer";
import Card from "../../../components/molecules/styled/Card";
import Form from "../../organisms/SetPassword/Form";
import { setPasswordSchema } from "../../../libs/schema";
import { SET_PASSWORD } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { passConfPassword } from "../../../propTypes/propTypes";

const SetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { type = "", token = "" } = useParams();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState<any>("");
  const [captcha, setCaptcha] = useState("");
  const [captchaMsg, setCaptchaMsg] = useState(
    "Please click on I'm not a robot"
  );
  const [setPassword, { loading, error, data }] = useMutation(SET_PASSWORD);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<passConfPassword>({ resolver: yupResolver(setPasswordSchema) });

  const captchaOnChange = (value: any) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

  // This Hook will execute after executing the FORGOT_PASSWORD query
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.setPassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (response.severity.includes("success")) {
        navigate('/login');
        navigate(0);
      }
    }
  }, [loading, error, data, resetField, setError, navigate]);

  const onSubmit = (values: passConfPassword) => {
    if (captcha) {
      if (type && token) {
        setPassword({
          variables: {
            input: {
              ...values,
              token,
              key: type === "set" ? "code" : "forgotPasswordToken",
            },
          },
        });
      } else {
        setSeverity("error");
        setMessage("Sorry, Token is invalid!");
      }
    } else {
      setCaptchaMsg("Please click on I'm not a robot");
    }
  };

  const onClose = () => navigate("/login");

  return (
    <NoHeaderNoFooter>
      <AdminWithoutLogInContainer alignCenter={true}>
        <Card maxWidth="300px">
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            onClose={onClose}
            message={message}
            severity={severity}
            errors={errors}
            captchaOnExpired={captchaOnExpired}
            captchaOnChange={captchaOnChange}
            captchaMsg={captchaMsg}
          />
        </Card>
      </AdminWithoutLogInContainer>
    </NoHeaderNoFooter>
  );
};

export default SetPassword;
