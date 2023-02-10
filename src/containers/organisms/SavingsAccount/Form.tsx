import React from "react";

import Label from "../../../components/atoms/Label/Label";
import Input from "./../../../components/atoms/Input/Input";
import Select from "./../../../components/atoms/Select/Select";
import Button from "./../../../components/atoms/Button/Button";
import Hints from "../../../components/atoms/Hints/Hints";
import Message from "../../../components/molecules/Message/Message";
import StyledForm from "../../../components/molecules/styled/StyledForm";
import Container from "../../../components/molecules/styled/Container";
import { activeInactiveList } from "../../../utils/utils";
import { savingsAccountTypes } from "../../../propTypes/propTypes";

type Props = {
  onSubmit: (values: savingsAccountTypes) => void;
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
            <Label htmlFor="Required amount">
              Required amount<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.requiredAmount?.message ? "error" : ""
              }`}
              type="number"
              rest={register("requiredAmount")}
            />
            <Hints>
              <strong>Note</strong>: Put ZERO in case of no required amount
            </Hints>
            {errors.requiredAmount && (
              <Message customClass="error">
                {errors.requiredAmount?.message}
              </Message>
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
    requiredAmount: {
      message: "",
    },
    status: {
      message: "",
    },
  },
};

export default Form;
