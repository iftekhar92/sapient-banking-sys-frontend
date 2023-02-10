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
import { cardInputTypes, optionsObj } from "../../../propTypes/propTypes";

type Props = {
  onSubmit: (values: cardInputTypes) => void;
  handleSubmit: any;
  register: any;
  errors?: any;
  incomeList: optionsObj[];
  accountTypeList: optionsObj[];
  cardTypeList: optionsObj[];
};

const Form: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  incomeList,
  accountTypeList,
  cardTypeList,
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
            <Label htmlFor="Annual Income">
              Annual Income<span>*</span>
            </Label>
            <Select
              customClass={`medium ${
                errors.fkIncomeId?.message ? "error" : ""
              }`}
              options={incomeList}
              defaultData={{ value: "", label: "Please select annual income" }}
              rest={register("fkIncomeId")}
            />
            {errors.fkIncomeId && (
              <Message customClass="error">
                {errors.fkIncomeId?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Account Type">
              Account Type<span>*</span>
            </Label>
            <Select
              customClass={`medium ${
                errors.fkAccountTypeId?.message ? "error" : ""
              }`}
              options={accountTypeList}
              defaultData={{ value: "", label: "Please select account type" }}
              rest={register("fkAccountTypeId")}
            />
            {errors.fkAccountTypeId && (
              <Message customClass="error">
                {errors.fkAccountTypeId?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Card Type">
              Card Type<span>*</span>
            </Label>
            <Select
              customClass={`medium ${
                errors.fkCardTypeId?.message ? "error" : ""
              }`}
              options={cardTypeList}
              defaultData={{ value: "", label: "Please select card type" }}
              rest={register("fkCardTypeId")}
            />
            {errors.fkCardTypeId && (
              <Message customClass="error">
                {errors.fkCardTypeId?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Validity No Of Years">
              Validity No Of Year(s)<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.validityNoOfYear?.message ? "error" : ""
              }`}
              type="number"
              rest={register("validityNoOfYear")}
            />
            {errors.validityNoOfYear && (
              <Message customClass="error">
                {errors.validityNoOfYear?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Limit">
              Limit<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.limitAmount?.message ? "error" : ""
              }`}
              type="number"
              rest={register("limitAmount")}
            />
            <Hints>
              <strong>Note</strong>: Put ZERO in case of no Limit
            </Hints>
            {errors.limitAmount && (
              <Message customClass="error">
                {errors.limitAmount?.message}
              </Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Annual Charge">
              Annual Charge<span>*</span>
            </Label>
            <Input
              customClass={`medium ${
                errors.annualCharge?.message ? "error" : ""
              }`}
              type="number"
              rest={register("annualCharge")}
            />
            <Hints>
              <strong>Note</strong>: Put ZERO in case of no Annual charge
            </Hints>
            {errors.annualCharge && (
              <Message customClass="error">
                {errors.annualCharge?.message}
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
  incomeList: [],
  accountTypeList: [],
  cardTypeList: [],
  errors: {
    name: {
      message: "",
    },
    fkIncomeId: {
      message: "",
    },
    fkAccountTypeId: {
      message: "",
    },
    fkCardTypeId: {
      message: "",
    },
    validityNoOfYear: {
      message: "",
    },
    limitAmount: {
      message: "",
    },
    annualCharge: {
      message: "",
    },
    status: {
      message: "",
    },
  },
};

export default Form;
