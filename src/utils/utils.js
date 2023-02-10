export const setCookie = (cname, cvalue) => {
  const d = new Date();
  d.setTime(
    d.getTime() +
      parseInt(process.env.REACT_APP_TOKEN_EXPIRY_DAY, 10) * 24 * 60 * 60 * 1000
  );
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const isValidated = (errors, setError) => {
  if (errors) {
    errors
      .filter((x) => x.value && x)
      .map((x) =>
        setError(x.key, {
          type: "manual",
          message: x.value,
        })
      );
    return false;
  }
  return true;
};

export const userList = [
  { value: "ADMIN", label: "Admin" },
  { value: "CUSTOMER", label: "Customer" },
];

export const activeInactiveList = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export const activeInactiveDeletedList = () => [
  ...activeInactiveList(),
  { value: "DELETED", label: "Deleted" },
];

export const txnTypeList = [
  { value: "Deposit", label: "Deposit" },
  { value: "Withdrawal", label: "Withdrawal" },
];

export const lineChartOptions = [
  { label: "Savings A/c - last week", value: "savingsLastWeek" },
  { label: "Savings A/c - last month", value: "savingsLastMonth" },
  { label: "Savings A/c - last year", value: "savingsLastYear" },
  { label: "Credit Card - last week", value: "creditCardLastweek" },
  { label: "Credit Card - last month", value: "creditCardLastMonth" },
  { label: "Credit Card - last year", value: "creditCardLastYear" },
];
export const doughnutChartOptions = [
  { label: "Savings A/c - last week", value: "savingsLastWeek" },
  { label: "Savings A/c - last month", value: "savingsLastMonth" },
  { label: "Savings A/c - last year", value: "savingsLastYear" }
];
