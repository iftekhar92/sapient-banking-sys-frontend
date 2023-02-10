import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Label from "../../../components/atoms/Label/Label";
import Input from "../../../components/atoms/Input/Input";
import Anchor from "../../../components/atoms/Anchor/Anchor";
import Message from "../../../components/molecules/Message/Message";
import Button from "../../../components/atoms/Button/Button";
import Container from "../../../components/molecules/styled/Container";
import { HeadingH2 } from "../../../components/molecules/styled/Headings";
import { passConfPassword } from "../../../propTypes/propTypes";

type Props = {
  onSubmit: (values: passConfPassword) => void;
  handleSubmit: any;
  register: any;
  onClose: () => void;
  message?: string;
  severity?: string;
  errors?: any;
  captchaOnExpired: () => void;
  captchaOnChange: (value: string) => void;
  captchaMsg?: string;
};

const Form: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  register,
  onClose,
  message,
  severity,
  errors,
  captchaOnExpired,
  captchaOnChange,
  captchaMsg,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <HeadingH2>SET PASSWORD</HeadingH2>
    {message && <Message customClass={severity}>{message}</Message>}
    <Container>
      <Label htmlFor="Password">
        Password<span>*</span>
      </Label>
      <Input
        customClass={errors.password?.message ? "error" : ""}
        type="password"
        rest={register("password")}
      />
      {errors.password && (
        <Message customClass="error">{errors.password?.message}</Message>
      )}
    </Container>
    <Container>
      <Label htmlFor="Confirm Password">
        Confirm Password<span>*</span>
      </Label>
      <Input
        customClass={errors.confirmPassword?.message ? "error" : ""}
        type="password"
        rest={register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <Message customClass="error">{errors.confirmPassword?.message}</Message>
      )}
    </Container>
    <Container>
      <ReCAPTCHA
        sitekey={`${process.env.REACT_APP_SITE_KEY}`}
        onChange={(currentValue: any) => captchaOnChange(currentValue)}
        onExpired={() => captchaOnExpired()}
        onErrored={() => captchaOnExpired()}
      />
      {captchaMsg && <Message customClass="error">{captchaMsg}</Message>}
    </Container>
    <Container className="align-center">
      <Button buttonType="primary">Submit</Button>
      <Button buttonType="secondary" callback={() => onClose()}>
        Cancel
      </Button>
    </Container>
    <Container>
      <ul className="link-list">
        <li>
          <Anchor href="/login" isExternal={false} customClass="">
            Already have an account?
          </Anchor>
        </li>
        <li>
          <Anchor href="/forgot/password" isExternal={true} customClass="">
            Forgot Password?
          </Anchor>
        </li>
      </ul>
    </Container>
  </form>
);

Form.defaultProps = {
  captchaOnExpired: () => {},
  captchaOnChange: () => {},
  captchaMsg: "",
  message: "",
  severity: "",
  errors: {
    password: {
      message: "",
    },
    confirmPassword: {
      message: "",
    },
  },
};

export default Form;
