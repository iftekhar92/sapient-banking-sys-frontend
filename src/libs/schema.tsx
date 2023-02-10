import * as Yup from "yup";
import "yup-phone";

export const signupSchema = Yup.object().shape({
  fullName: Yup.string().min(3).max(150).required("Please enter full name"),
  email: Yup.string()
    .max(150)
    .email("Please indicate a valid email address.")
    .required("Please enter email address."),
  phone: Yup.string().phone().required("Please enter phone number"),
  fkIncomeId: Yup.string().required("Please select Income."),
  occupation: Yup.string().max(150).required("Please enter occupation."),
  address: Yup.string().max(200).required("Please enter address."),
  fkGovId: Yup.string().required("Please select Govt ID."),
  govIdProof: Yup.string().required("Please Upload Govt ID proof."),
});
export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Please enter full name"),
  phone: Yup.string().phone().required("Please enter phone number"),
  occupation: Yup.string().max(150).required("Please enter occupation."),
  profilePic: Yup.string().nullable().notRequired(),
});
export const loginSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(150)
      .required("Email is required"),
    password: Yup.string().required("Please enter password"),
  })
  .required();

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(150)
    .required("Email is required"),
});

export const setPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Please enter confirm password"),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Please set old password"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Please enter confirm password"),
});

export const nameStatusSchema = Yup.object().shape({
  name: Yup.string().nullable().notRequired(),
  status: Yup.string().nullable().notRequired(),
});

export const incomeSchema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required("Please enter name"),
  from: Yup.number().positive().min(0).typeError("Please enter number."),
  to: Yup.number().positive().min(1).typeError("Please enter number."),
  status: Yup.string().required("Please enter status"),
});
export const nameStatusInputSchema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required("Please enter name"),
  status: Yup.string().required("Please enter status"),
});
export const savingsAccountSchema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required("Please enter name"),
  requiredAmount: Yup.number()
    .positive()
    .min(0)
    .typeError("Please enter required amount."),
  status: Yup.string().required("Please enter status"),
});
export const cardSchema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required("Please enter name"),
  fkIncomeId: Yup.string().required("Please select annual income"),
  fkAccountTypeId: Yup.string().required("Please select account type"),
  fkCardTypeId: Yup.string().required("Please select card type"),
  validityNoOfYear: Yup.number()
    .positive()
    .min(1)
    .typeError("Please enter no of year."),
  limitAmount: Yup.number()
    .positive()
    .min(0)
    .typeError("Please enter card limit."),
  annualCharge: Yup.number()
    .positive()
    .min(0)
    .typeError("Please enter annual charge."),
  status: Yup.string().required("Please select status"),
});
export const openAccountSchema = Yup.object().shape({
  fkAccountTypeId: Yup.string().required("Please select account type"),
  fkSavingsAccountId: Yup.string().nullable().notRequired(),
  fkCardId: Yup.string().nullable().notRequired(),
});
export const makeTransactionSchema = Yup.object().shape({
  txnType: Yup.string().required("Please select transaction type"),
  fkAccountTypeId: Yup.string().required("Please select account type"),
  fkCardId: Yup.string().nullable().notRequired(),
  fkSavingsAccountId: Yup.string().nullable().notRequired(),
  amount: Yup.number().positive().min(1).typeError("Please enter amount."),
  remark: Yup.string().max(20).nullable().notRequired(),
});
