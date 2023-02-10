import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {SiGnuprivacyguard} from 'react-icons/si';
import {RiLock2Fill} from 'react-icons/ri'

import Label from "../../../components/atoms/Label/Label";
import Input from "../../../components/atoms/Input/Input";
import Select from "../../../components/atoms/Select/Select";
import Anchor from "../../../components/atoms/Anchor/Anchor";
import Message from "../../../components/molecules/Message/Message";
import Button from "../../../components/atoms/Button/Button";
import Container from "../../../components/molecules/styled/Container";
import { HeadingH2 } from "../../../components/molecules/styled/Headings";
import { optionsObj, signupType } from "../../../propTypes/propTypes";
import Image from "../../../components/atoms/Image/Image";
import settings from "../../../theme/settings";

type Props = {
  onSubmit: (values: signupType) => void;
  handleSubmit: any;
  register: any;
  onChangeFileHandler?: (event: React.MouseEvent<any>) => void;
  onClose: () => void;
  imageSrc?: string;
  govtProofList: optionsObj[];
  incomeList: optionsObj[];
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
  onChangeFileHandler,
  onClose,
  imageSrc,
  govtProofList,
  incomeList,
  message,
  severity,
  errors,
  captchaOnExpired,
  captchaOnChange,
  captchaMsg,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className="is-scrollable">
    <HeadingH2>SIGNUP <RiLock2Fill color={settings.solidColors.red} size={settings.icons.iconL} /></HeadingH2>
    {message && <Message customClass={severity}>{message}</Message>}
    <Container>
      <Label htmlFor="Full name">
        Full name<span>*</span>
      </Label>
      <Input
        customClass={errors?.fullName?.message ? "error" : ""}
        type="text"
        rest={register("fullName")}
      />
      {errors?.fullName && (
        <Message customClass="error">{errors?.fullName?.message}</Message>
      )}
    </Container>
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
      <Label htmlFor="Phone">
        Phone<span>*</span>
      </Label>
      <Input
        customClass={errors?.phone?.message ? "error" : ""}
        type="number"
        rest={register("phone")}
      />
      {errors?.phone && (
        <Message customClass="error">{errors?.phone?.message}</Message>
      )}
    </Container>
    <Container>
      <Label htmlFor="Occupation">
        Occupation<span>*</span>
      </Label>
      <Input
        customClass={errors?.occupation?.message ? "error" : ""}
        type="text"
        rest={register("occupation")}
      />
      {errors?.occupation && (
        <Message customClass="error">{errors?.occupation?.message}</Message>
      )}
    </Container>
    <Container>
      <Label htmlFor="Residance">
        Residance<span>*</span>
      </Label>
      <Input
        customClass={errors?.address?.message ? "error" : ""}
        type="text"
        rest={register("address")}
      />
      {errors?.address && (
        <Message customClass="error">{errors?.address?.message}</Message>
      )}
    </Container>
    <Container>
      <Label htmlFor="Annual Income">
        Annual Income<span>*</span>
      </Label>
      <Select
        customClass={errors.fkIncomeId?.message ? "error" : ""}
        options={incomeList}
        defaultData={{ value: "", label: "Please select Annual income" }}
        rest={register("fkIncomeId")}
      />
      {errors.fkIncomeId && (
        <Message customClass="error">{errors.fkIncomeId?.message}</Message>
      )}
    </Container>
    <Container>
      <Label htmlFor="Govt. ID">
        Govt. ID<span>*</span>
      </Label>
      <Select
        customClass={errors.fkGovId?.message ? "error" : ""}
        options={govtProofList}
        defaultData={{ value: "", label: "Please select Govt ID" }}
        rest={register("fkGovId")}
      />
      {errors.fkGovId && (
        <Message customClass="error">{errors.fkGovId?.message}</Message>
      )}
    </Container>
    <Container>
      <div className="image-sec">
        <div className="image-sec-label">
          <Label htmlFor="Image">Govt Proof ID</Label>
          <Input
            customClass={`medium ${errors.govIdProof?.message ? "error" : ""}`}
            type="file"
            rest={register("image", {
              onChange: onChangeFileHandler,
            })}
          />
          {errors.govIdProof && (
            <Message customClass="error">{errors.govIdProof?.message}</Message>
          )}
        </div>
        {imageSrc && (
          <div className="image-sec-preview">
            <Label htmlFor="Image Preview">Preview</Label>
            <Image src={imageSrc} customClass="profile iconXl" />
          </div>
        )}
      </div>
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
    <Container className="align-center">
    <div className="icon-with-link">
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
    </Container>
  </form>
);

Form.defaultProps = {
  captchaOnExpired: () => {},
  captchaOnChange: () => {},
  captchaMsg: "",
  onChangeFileHandler: () => {},
  imageSrc: "",
  message: "",
  severity: "",
  govtProofList: [],
  incomeList: [],
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
