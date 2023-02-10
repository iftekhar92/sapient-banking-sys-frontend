import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Select from "../../atoms/Select/Select";
import Button from "../../atoms/Button/Button";
import Message from "../../molecules/Message/Message";
import { nameStatusSchema } from "../../../libs/schema";
import SubContainer from "../../molecules/styled/SubContainer";
import { activeInactiveList } from "../../../utils/utils";
import { nameTypeSearch } from "../../../propTypes/propTypes";

type Props = {
  reset: () => void;
  onSubmitHandler: (data: nameTypeSearch) => void;
};

const NameStatus: React.FC<Props> = ({ onSubmitHandler, reset }) => {
  const [severity] = useState("error");
  const [message] = useState("");
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<nameTypeSearch>({
    resolver: yupResolver(nameStatusSchema),
  });

  const onSubmit = (input: nameTypeSearch) => {
    onSubmitHandler(input);
  };

  const resetForm = () => {
    resetField("name");
    resetField("status");
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {message && <Message customClass={severity}>{message}</Message>}
        <SubContainer isAlwaysVertical={true}>
          <Label htmlFor="Name">Name</Label>
          <Input
            customClass={`medium ${errors.name?.message ? "error" : ""}`}
            type="text"
            rest={register("name")}
          />
          {errors.name && (
            <Message customClass="error">{errors.name?.message}</Message>
          )}
        </SubContainer>
        <SubContainer isAlwaysVertical={true}>
          <Label htmlFor="Status">Status</Label>
          <Select
            customClass={`medium ${errors.status?.message ? "error" : ""}`}
            options={activeInactiveList}
            defaultData={{ label: "Select status", value: "" }}
            rest={register("status")}
          />
          {errors.status && (
            <Message customClass="error">{errors.status?.message}</Message>
          )}
        </SubContainer>
        <SubContainer isAlwaysVertical={false}>
          <Button buttonType="primary">Search</Button>
          <Button buttonType="secondary" callback={() => resetForm()}>
            Clear search
          </Button>
        </SubContainer>
      </form>
    </>
  );
};

export default NameStatus;
