import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import NoHeaderNoFooter from "../../organisms/Layouts/NoHeaderNoFooter";
import { AdminWithoutLogInContainer } from "../../../components/molecules/styled/AdminWithoutLogInContainer";
import Card from "../../../components/molecules/styled/Card";
import Form from "../../organisms/UpdatePasswordRequest/Form";
import { emailSchema } from "../../../libs/schema";
import { GET_TOKEN_TO_SET_PASSWORD } from "../../../constants/Query";
import { isValidated } from "../../../utils/utils";
import { emailType } from "../../../propTypes/propTypes";

const UpdatePasswordRequest: React.FC = () => {
  const { type = "" } = useParams();
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaMsg, setCaptchaMsg] = useState(
    "Please click on I'm not a robot"
  );
  const [getTokenToSetPassword, { loading, error, data }] = useLazyQuery(
    GET_TOKEN_TO_SET_PASSWORD
  );
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<emailType>({ resolver: yupResolver(emailSchema) });

  // Form submit handler
  const onSubmit = (values: emailType) => {
    if (["set", "forgot"].includes(type)) {
      if (captcha) {
        getTokenToSetPassword({
          variables: {
            input: {
              ...values,
              key: type === "set" ? "code" : "forgotPasswordToken",
            },
          },
        });
      } else {
        setCaptchaMsg("Please click on I'm not a robot");
      }
    } else {
      setSeverity("error bg");
      setMessage("Request does not exists!");
    }
  };

  // Response: Form submit handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.getTokenToSetPassword;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        navigate(`/${type}/password/${response.token}`);
        navigate(0);
      }
    }
  }, [loading, error, data, resetField, setError, navigate, type]);

  const captchaOnChange = (value: any) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

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
            heading="VERIFY ACCOUNT"
            captchaOnExpired={captchaOnExpired}
            captchaOnChange={captchaOnChange}
            captchaMsg={captchaMsg}
          />
        </Card>
      </AdminWithoutLogInContainer>
    </NoHeaderNoFooter>
  );
};

export default UpdatePasswordRequest;
