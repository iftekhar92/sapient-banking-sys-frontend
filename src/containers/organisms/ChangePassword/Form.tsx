import React from "react";

import Label from "../../../components/atoms/Label/Label";
import Input from "./../../../components/atoms/Input/Input";
import Button from "./../../../components/atoms/Button/Button";
import Message from "../../../components/molecules/Message/Message";
import StyledForm from "../../../components/molecules/styled/StyledForm";
import Container from "../../../components/molecules/styled/Container";
import { changePasswordTypes } from "../../../propTypes/propTypes";

type Props = {
  onSubmit: (values: changePasswordTypes) => void;
  handleSubmit: any;
  register: any;
  errors?: any;
};

const Form: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
}) => (
  <StyledForm>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div className="form-container-left">
          <Container>
            <Label htmlFor="Old Password">
              Old Password<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.oldPassword?.message ? "error" : ""
              }`}
              type="password"
              rest={register("oldPassword")}
            />
            {errors.oldPassword && (
              <Message customClass="error">
                {errors.oldPassword?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Password">
              Password<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.password?.message ? "error" : ""
              }`}
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
              customClass={`medium ${
                errors.confirmPassword?.message ? "error" : ""
              }`}
              type="password"
              rest={register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <Message customClass="error">
                {errors.confirmPassword?.message}
              </Message>
            )}
          </Container>
          <Container className="align-center">
            <Button buttonType="primary">Submit</Button>
          </Container>
        </div>
      </div>
    </form>
  </StyledForm>
);

Form.defaultProps = {
  errors: {
    oldPassword: {
      message: "",
    },
    password: {
      message: "",
    },
    confirmPassword: {
      message: "",
    },
  },
};

export default Form;
