import React from "react";

import Label from "../../../components/atoms/Label/Label";
import Input from "./../../../components/atoms/Input/Input";
import Button from "./../../../components/atoms/Button/Button";
import Message from "../../../components/molecules/Message/Message";
import StyledForm from "../../../components/molecules/styled/StyledForm";
import Container from "../../../components/molecules/styled/Container";
import { updateProfileInputTypes } from "../../../propTypes/propTypes";
import Image from "../../../components/atoms/Image/Image";

type Props = {
  onSubmit: (values: updateProfileInputTypes) => void;
  handleSubmit: any;
  register: any;
  errors?: any;
  onChangeFileHandler: (event: React.MouseEvent<any>) => void;
  imageSrc?: string;
};

const Form: React.FC<Props> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  onChangeFileHandler,
  imageSrc,
}) => (
  <StyledForm>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-container">
        <div className="form-container-left">
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
              <Message customClass="error">
                {errors?.occupation?.message}
              </Message>
            )}
          </Container>
          <Container>
            <div className="image-sec">
              <div className="image-sec-label">
                <Label htmlFor="Image">Profile Picture</Label>
                <Input
                  customClass={`medium ${
                    errors.profilePic?.message ? "error" : ""
                  }`}
                  type="file"
                  rest={register("image", {
                    onChange: onChangeFileHandler,
                  })}
                />
                {errors.profilePic && (
                  <Message customClass="error">
                    {errors.profilePic?.message}
                  </Message>
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
          <Container className="align-center">
            <Button buttonType="primary">Submit</Button>
          </Container>
        </div>
      </div>
    </form>
  </StyledForm>
);

Form.defaultProps = {
  imageSrc: "",
  errors: {
    fullName: {
      message: "",
    },
    phone: {
      message: "",
    },
    occupation: {
      message: "",
    },
    profilePic: {
      message: "",
    },
  },
};

export default Form;
