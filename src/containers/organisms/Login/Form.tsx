import React from "react";
import {Si1Password, SiGnuprivacyguard} from 'react-icons/si';
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
};

const Form: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  register,
  message,
  severity,
  errors,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <HeadingH2>LOGIN <AiOutlineLogin color={settings.solidColors.red} size={settings.icons.iconL} /> </HeadingH2>
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
      <Label htmlFor="Password">
        Password<span>*</span>
      </Label>
      <Input
        customClass={errors?.password?.message ? "error" : ""}
        type="password"
        rest={register("password")}
      />
      {errors?.password?.message && (
        <Message customClass="error">{errors?.password.message}</Message>
      )}
    </Container>
    <Container>
      <Button buttonType="primary">Submit</Button>
    </Container>
    <Container>
      <div className="icon-with-link">
        <div className="align-row">
          <Si1Password color={settings.solidColors.blue} size={settings.icons.iconS} />
          <Anchor href="/forgot/password" isExternal={true}>
            Forgot Password?
          </Anchor>
          <span className="separator">Or</span>
        <Anchor href="/set/password" isExternal={true}>
            Set Password?
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
