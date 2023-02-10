import React from "react";

import Label from "../../../components/atoms/Label/Label";
import Input from "./../../../components/atoms/Input/Input";
import Select from "./../../../components/atoms/Select/Select";
import Button from "./../../../components/atoms/Button/Button";
import Message from "../../../components/molecules/Message/Message";
import StyledForm from "../../../components/molecules/styled/StyledForm";
import Container from "../../../components/molecules/styled/Container";
import { activeInactiveList } from "../../../utils/utils";
import { incomeInputTypes } from "../../../propTypes/propTypes";

type Props = {
  onSubmit: (values: incomeInputTypes) => void;
  handleSubmit: any;
  register: any;
  errors?: any;
};

const Form: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors
}) => (
  <StyledForm>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
          <div className="form-container-left">
        <Container>
          <Label htmlFor="Name">
            Name<span>*</span>
          </Label>
          <Input
            customClass={`medium ${errors.name?.message ? "error" : ""}`}
            type="text"
            rest={register("name")}
          />
          {errors.name && (
            <Message customClass="error">{errors.name?.message}</Message>
          )}
        </Container>
        <Container>
          <Label htmlFor="Status">
            Status<span>*</span>
          </Label>
          <Select
            customClass={`medium ${errors.status?.message ? "error" : ""}`}
            options={activeInactiveList}
            defaultData={{ value: "", label: "Please select status" }}
            rest={register("status")}
          />
          {errors.status && (
            <Message customClass="error">{errors.status?.message}</Message>
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
    name: {
      message: "",
    },
    status: {
      message: "",
    },
  },
};

export default Form;
