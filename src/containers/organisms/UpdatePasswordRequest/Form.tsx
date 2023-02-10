import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {SiGnuprivacyguard} from 'react-icons/si';
import {AiOutlineLogin} from 'react-icons/ai'; 

import Label from "../../../components/atoms/Label/Label";
import Input from "../../../components/atoms/Input/Input";
import Anchor from "../../../components/atoms/Anchor/Anchor";
import Message from "../../../components/molecules/Message/Message";
import Button from "../../../components/atoms/Button/Button";
import Container from "../../../components/molecules/styled/Container";
import { HeadingH2 } from "../../../components/molecules/styled/Headings";
import { loginType } from "../../../propTypes/propTypes";
import settings from "../../../theme/settings";

type Props = {
  onSubmit: (values: loginType) => void;
  handleSubmit: any;
  register: any;
  message?: string;
  severity?: string;
  errors?: any;
  heading?: string;
  captchaOnExpired: () => void;
  captchaOnChange: (value: string) => void;
  captchaMsg?: string;
};

const Form: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  register,
  message,
  severity,
  errors,
  heading,
  captchaOnExpired,
  captchaOnChange,
  captchaMsg,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <HeadingH2>{heading} <AiOutlineLogin color={settings.solidColors.red} size={settings.icons.iconL} /> </HeadingH2>
    {message && <Message customClass={severity}>{message}</Message>}
    <Container>
      <Label htmlFor="Email">
        Email<span>*</span>
      </Label>
      <Input
        customClass={errors?.email?.message ? "error" : ""}
        type="email"
        rest={register("email")}
      />
      {errors?.email && (
        <Message customClass="error">{errors?.email?.message}</Message>
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
    <Container>
      <Button buttonType="primary">Submit</Button>
    </Container>
    <Container>
      <div className="icon-with-link">
      <div>
      <SiGnuprivacyguard color={settings.solidColors.blue} size={settings.icons.iconS} />
      <Anchor
        customClass="align-center"
        href="/login"
        isExternal={true}
        ariaLabel="Login"
      >
        Already have an account?
      </Anchor>
        </div>
        <div>
          <SiGnuprivacyguard color={settings.solidColors.blue} size={settings.icons.iconS} />
          <Anchor href="/signup" isExternal={true}>
            Signup
          </Anchor>
        </div>
      </div>
    </Container>
  </form>
);

Form.defaultProps = {
  captchaOnExpired: () => {},
  captchaOnChange: () => {},
  captchaMsg: "",
  heading: '',
  message: "",
  severity: "",
  errors: {
    email: {
      message: "",
    },
    password: {
      message: "",
    },
  },
};

export default Form;
