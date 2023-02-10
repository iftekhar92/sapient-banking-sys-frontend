import { string } from "yup";

export type pageNumberType = {
  adminPageNumber: number;
};

type startDateType = {
  selectedDate?: any;
  startDate?: any;
  endDate?: any;
};

type datePickerOnRefType = {
  current: startDateType;
};

export type datePickerType = {
  onRef: datePickerOnRefType;
  dateFormat?: string | string[] | undefined;
  defaultValue: any;
  showTimeSelect: true | false;
  customClass?: string;
  defaultEndDate?: any;
  defaultStartDate?: any;
};

export type loginType = {
  email: string;
  password: string | number;
};

export type signupType = {
  fullName: string;
  email: string;
  phone: number;
  fkIncomeId: string;
  occupation: string;
  address: string;
  fkGovId: string;
  govIdProof: string;
  image?: string;
};

export type loginErrorType = {
  email: {
    message?: string;
  };
  password: {
    message?: string;
  };
};

export type optionsObj = {
  value: number | string;
  label: number | string;
};

type formControl = {
  setError: Function;
  clearErrors?: Function;
  resetField: Function;
  startDate?: any;
  expireDate?: any;
};
export type onRefType = {
  current: formControl;
};

export type passConfPassword = {
  password: string;
  confirmPassword: string;
};

export type emailType = {
  email: string;
};

export type nameTypeSearch = {
  name?: string;
  status?: string;
};

export type incomeInputTypes = {
  name: string;
  from: string;
  to: string;
  status: string;
};

export type updateProfileInputTypes = {
  fullName: string;
  phone: string;
  occupation: string;
  profilePic: string;
  image?: string;
};
export type profileDetailTypes = {
  fullName?: string;
  email?: string;
  phone?: string;
  fkIncomeId?: string;
  occupation?: string;
  address?: string;
  profilePic?: string;
};

export type changePasswordTypes = {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};

export type savingsAccountTypes = {
  name: string;
  requiredAmount: string;
  status: string;
};

export type nameStatusInputTypes = {
  name: string;
  status: string;
};

export type cardInputTypes = {
  name: string;
  fkIncomeId: String;
  fkAccountTypeId: string;
  fkCardTypeId?: string;
  validityNoOfYear: string;
  limitAmount: string;
  annualCharge: string;
  status: string;
};

export type openAccountTypes = {
  fkAccountTypeId: string;
  fkSavingsAccountId?: String;
  fkCardId?: string;
};

export type dateType = {
  startDate?: string;
  endDate?: string;
};

export type makeTransactionTypes = {
  txnType: string;
  fkAccountTypeId: string;
  fkCardId?: string;
  fkSavingsAccountId?: string;
  amount: string;
  remark?: string;
};

export type tileTypes = {
  _id?: string;
  customClass?: string;
  title?: string;
  amount?: string;
  overDueTitle?: string;
  overDueAmount?: string;
  hasPayNowBtn: boolean;
  accountInfo?: string;
};

export type tilesType = {
  savings:tileTypes[];
  credit:tileTypes[];
};

export type profileType = {
  customClass?:string;
  name:string;
  profilePic:string;
  txnDetails:lastTxnDetails[];
};

export type lastTxnDetails = {
  _id?:string;
  title?: string;
  link?: string;
  date?: string;
};

type datasetsType = {
  label?: string;
  backgroundColor?: Array<string> | string;
  borderColor?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  data: Array<number>;
};

export type lineChartItemsType = {
  labels: Array<any>;
  datasets: Array<datasetsType>;
};

export type lineChartType = {
  savingsLastWeek: lineChartItemsType;
  savingsLastMonth: lineChartItemsType;
  savingsLastYear: lineChartItemsType;
  creditCardLastweek: lineChartItemsType;
  creditCardLastMonth: lineChartItemsType;
  creditCardLastYear: lineChartItemsType;
};