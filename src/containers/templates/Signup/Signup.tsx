import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import NoHeaderNoFooter from "../../organisms/Layouts/NoHeaderNoFooter";
import { AdminWithoutLogInContainer } from "../../../components/molecules/styled/AdminWithoutLogInContainer";
import Card from "../../../components/molecules/styled/Card";
import Form from "../../organisms/Signup/Form";
import { signupSchema } from "../../../libs/schema";
import { isValidated } from "../../../utils/utils";
import UploadManager from "../../../libs/UploadManager";
import { signupType } from "../../../propTypes/propTypes";
import { GOVT_PROOF_LIST, FIND_ALL_INCOMES } from "../../../constants/Query";
import { ACTIVE_INACTIVE_LIST, USER_TYPE } from "../../../constants";
import { SIGNUP } from "../../../constants/Mutation";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState<any>("");
  const [govtProofList, setGovtProofList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [captcha, setCaptcha] = useState("");
  const [captchaMsg, setCaptchaMsg] = useState(
    "Please click on I'm not a robot"
  );
  const [signup, { loading, error, data }] = useMutation(SIGNUP);
  const [
    findAllProofTypes,
    { loading: p_loading, error: p_error, data: p_data },
  ] = useLazyQuery(GOVT_PROOF_LIST);
  const [findAllIncomes, { loading: i_loading, error: i_error, data: i_data }] =
    useLazyQuery(FIND_ALL_INCOMES);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<signupType>({ resolver: yupResolver(signupSchema) });

  // Fetch Govt. proof and Income list
  useEffect(() => {
    findAllProofTypes({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
    findAllIncomes({
      variables: { input: { status: ACTIVE_INACTIVE_LIST.ACTIVE } },
    });
  }, [findAllProofTypes, findAllIncomes]);

  // Response: All Govt. Proof list
  useEffect(() => {
    if (!p_loading && !p_error && p_data) {
      const { response } = p_data.findAllProofTypes;
      setGovtProofList(() =>
        response.map((x: { name: string; _id: string }) => ({
          label: x.name,
          value: x._id,
        }))
      );
    }
  }, [p_loading, p_error, p_data, setGovtProofList]);
  // Response: All Income list
  useEffect(() => {
    if (!i_loading && !i_error && i_data) {
      const { response } = i_data.findAllIncomes;
      setIncomeList(() =>
        response.map((x: { range: string; _id: string }) => ({
          label: x.range,
          value: x._id,
        }))
      );
    }
  }, [i_loading, i_error, i_data, setIncomeList]);

  // Form submit handler
  const onSubmit = (values: signupType) => {
    if (!getValues("govIdProof")) {
      setError("govIdProof", {
        type: "manual",
        message: "Please upload a Govt Proof ID in .jpg/.phg",
      });
    } else {
      clearErrors("govIdProof");
      if (captcha) {
        const { image, ...rest } = values;
        signup({
          variables: { input: { ...rest, userType: USER_TYPE.CUSTOMER } },
        });
      } else {
        setCaptchaMsg("Please click on I'm not a robot");
      }
    }
  };

  // Response: Form submit handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.signup;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError)
      if (!response.error && response.severity.includes("success")) {
        navigate(`/set/password/${response.token}`);
        navigate(0);
      }
    }
  }, [loading, error, data, setError, navigate]);

  const onChangeFileHandler = (event: any) => {
    const { files } = event.target;
    if (files && files[0]) {
      const { name, size } = files[0];
      const fileSize = size / 1024 / 1024; // in MiB
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(name)) {
        setError("govIdProof", {
          type: "manual",
          message:
            "Please you can upload file having extensions .jpeg/.jpg/.png/.gif only.",
        });
        setValue("govIdProof", "");
      } else if (fileSize > 5) {
        setError("govIdProof", {
          type: "manual",
          message: "File size exceeds 5 MiB",
        });
        setValue("govIdProof", "");
      } else {
        UploadManager(event.target)
          .then((src: any) => {
            setImageSrc(src);
            setValue("govIdProof", src);
          })
          .catch((err) => {
            console.error(err);
            setError("govIdProof", {
              type: "manual",
              message: "Something went wrong, while file uploading!",
            });
            setValue("govIdProof", "");
          });
      }
    }
  };

  const captchaOnChange = (value: any) => {
    setCaptcha(value || "");
    setCaptchaMsg("");
  };

  const captchaOnExpired = () => {
    setCaptcha("");
    setCaptchaMsg("Please click on I'm not a robot");
  };

  const onClose = () => navigate("/login");

  return (
    <NoHeaderNoFooter>
      <AdminWithoutLogInContainer alignCenter={true}>
        <Card maxWidth="500px">
          <Form
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            onChangeFileHandler={onChangeFileHandler}
            onClose={onClose}
            imageSrc={imageSrc}
            govtProofList={govtProofList}
            incomeList={incomeList}
            message={message}
            severity={severity}
            errors={errors}
            captchaOnExpired={captchaOnExpired}
            captchaOnChange={captchaOnChange}
            captchaMsg={captchaMsg}
          />
        </Card>
      </AdminWithoutLogInContainer>
    </NoHeaderNoFooter>
  );
};

export default Signup;
