import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import SubHeaderAction from "../../molecules/SubHeaderAction/SubHeaderAction";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import Message from "../../../components/molecules/Message/Message";
import { Content } from "../../../components/molecules/styled/Content";
import Form from "../../organisms/UpdateProfile/Form";
import { updateProfileInputTypes } from "../../../propTypes/propTypes";
import { PROFILE_DETAIL } from "../../../constants/Query";
import { UPDATE_PROFILE } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { updateProfileSchema } from "../../../libs/schema";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_MESSAGE } from "../../../constants";
import UploadManager from "../../../libs/UploadManager";

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const [loader, setLoader] = useState(true);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState<any>("");
  const [imageValue, setImageValue] = useState<any>("");
  const [updateProfile, { loading, error, data }] = useMutation(UPDATE_PROFILE);
  const [findDetail, { loading: f_loading, error: f_error, data: f_data }] =
    useLazyQuery(PROFILE_DETAIL);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<updateProfileInputTypes>({
    resolver: yupResolver(updateProfileSchema),
  });

  // Loads default data
  useEffect(() => {
    findDetail();
  }, [findDetail]);

  // Response: Loads data
  useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const { response } = f_data.findDetail;
      if (!response) {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: "Record does not exist!",
            severity: "error bg",
          },
        });
        navigate("/admin/dashboard");
      } else {
        const { fullName, phone, occupation, profilePic } = response;
        setValue("fullName", fullName);
        setValue("phone", phone);
        setValue("occupation", occupation);
        setImageValue(profilePic);
        if (profilePic) {
          const basePath = process.env.REACT_APP_ENV === 'local' ? process.env.REACT_APP_GATEWAY_LOCAL : process.env.REACT_APP_GATEWAY_LIVE;
          setImageSrc(
            `${basePath}/images/profile/${profilePic}`
          );
        }
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader, setValue, dispatch]);

  // Form submit Handler
  const onSubmit = (values: updateProfileInputTypes) => {
    const {image, ...rest} = values;
    updateProfile({
      variables: {
        input: {
          ...rest,
          profilePic: imageValue || "",
        },
      },
    });
  };

  // Response: Submit Handler
  useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateProfile;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      if (!response.error && response.severity.includes("success")) {
        navigate(0);
      }
    }
  }, [loading, error, data, setSeverity, setMessage, setError, navigate]);

  // File upload handler
  const onChangeFileHandler = (event: any) => {
    const { files } = event.target;
    if (files && files[0]) {
      const { name, size } = files[0];
      const fileSize = size / 1024 / 1024; // in MiB
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(name)) {
        setError("profilePic", {
          type: "manual",
          message:
            "Please you can upload file having extensions .jpeg/.jpg/.png/.gif only.",
        });
      } else if (fileSize > 5) {
        setError("profilePic", {
          type: "manual",
          message: "File size exceeds 5 MiB",
        });
      } else {
        UploadManager(event.target)
          .then((src) => {
            setImageSrc(src);
            setImageValue(src);
            resetField("profilePic");
          })
          .catch((err: any) => console.error(err));
      }
    }
  };

  return (
    <Content>
      <SubHeaderAction title="Update Profile" addNewLink="" addNewBtnTxt="" />
      {message && <Message customClass={severity}>{message}</Message>}
      {loader ? (
        <Loader />
      ) : (
        <Form
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onChangeFileHandler={onChangeFileHandler}
          imageSrc={imageSrc}
        />
      )}
    </Content>
  );
};

export default UpdateProfile;
