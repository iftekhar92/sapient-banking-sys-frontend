import React from "react";

import Label from "../../../components/atoms/Label/Label";
import Input from "../../../components/atoms/Input/Input";
import Select from "./../../../components/atoms/Select/Select";
import Button from "./../../../components/atoms/Button/Button";
import Message from "../../../components/molecules/Message/Message";
import StyledForm from "../../../components/molecules/styled/StyledForm";
import Container from "../../../components/molecules/styled/Container";
import { makeTransactionTypes, optionsObj } from "../../../propTypes/propTypes";
import { txnTypeList } from "../../../utils/utils";

type Props = {
  onSubmit: (values: makeTransactionTypes) => void;
  handleSubmit: Function;
  register: any;
  errors: any;
  onChangeAccountType: (currentVal: string) => void;
  isSavingsAc: (currentVal?: string) => boolean;
  accountTypeList: optionsObj[];
  savingsAccountList: optionsObj[];
  cardList: optionsObj[];
};

const Form: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  onChangeAccountType,
  isSavingsAc,
  savingsAccountList,
  accountTypeList,
  cardList,
}) => (
  <StyledForm>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div className="form-container-left">
          <Container>
            <Label htmlFor="Transaction Type">
              Transaction Type<span>*</span>
            </Label>
            <Select
              customClass={`medium ${errors.txnType?.message ? "error" : ""}`}
              options={txnTypeList}
              defaultData={{
                value: "",
                label: "Please select transaction type",
              }}
              rest={register("txnType")}
            />
            {errors.txnType && (
              <Message customClass="error">{errors.txnType?.message}</Message>
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
              rest={register("fkAccountTypeId", {
                onChange: (e: { target: { value: string } }) =>
                  onChangeAccountType(e?.target?.value),
              })}
            />
            {errors.fkAccountTypeId && (
              <Message customClass="error">
                {errors.fkAccountTypeId?.message}
              </Message>
            )}
          </Container>
          {isSavingsAc() && (
            <Container>
              <Label htmlFor="Saving Account Types">
                Saving Account Types<span>*</span>
              </Label>
              <Select
                customClass={`medium ${
                  errors.fkSavingsAccountId?.message ? "error" : ""
                }`}
                options={savingsAccountList}
                defaultData={{
                  value: "",
                  label: "Please select saving account type",
                }}
                rest={register("fkSavingsAccountId")}
              />
              {errors.fkSavingsAccountId && (
                <Message customClass="error">
                  {errors.fkSavingsAccountId?.message}
                </Message>
              )}
            </Container>
          )}
          {!isSavingsAc() && (
            <Container>
              <Label htmlFor="Credit Card(s)">
                Credit Card(s)<span>*</span>
              </Label>
              <Select
                customClass={`medium ${
                  errors.fkCardId?.message ? "error" : ""
                }`}
                options={cardList}
                defaultData={{ value: "", label: "Please select card" }}
                rest={register("fkCardId")}
              />
              {errors.fkCardId && (
                <Message customClass="error">
                  {errors.fkCardId?.message}
                </Message>
              )}
            </Container>
          )}
          <Container>
            <Label htmlFor="Amount">
              Amount<span>*</span>
            </Label>
            <Input
              customClass={`medium ${errors.amount?.message ? "error" : ""}`}
              type="number"
              rest={register("amount")}
            />
            {errors.amount && (
              <Message customClass="error">{errors.amount?.message}</Message>
            )}
          </Container>
          <Container>
            <Label htmlFor="Remark">Remark</Label>
            <Input
              customClass={`medium ${errors.remark?.message ? "error" : ""}`}
              type="text"
              rest={register("remark")}
            />
            {errors.remark && (
              <Message customClass="error">{errors.remark?.message}</Message>
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
  savingsAccountList: [],
  accountTypeList: [],
  cardList: [],
  errors: {
    txnType: {
      message: "",
    },
    fkAccountTypeId: {
      message: "",
    },
    fkCardId: {
      message: "",
    },
    fkSavingsAccountId: {
      message: "",
    },
    amount: {
      message: "",
    },
    remark: {
      message: "",
    },
  },
};

export default Form;
