import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { DashboardStyle } from "../../../components/molecules/styled/Dashboard";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import NoAccount from "../../organisms/Dashboard/NoAccount";
import AccountInfo from "../../organisms/Dashboard/AccountInfo";
import { ACCOUNT_SUMMARY } from "../../../constants/Query";
import { accountSummaryStates } from "../../../state/states";
import {
  lineChartType,
  profileType,
  tilesType,
} from "../../../propTypes/propTypes";

interface Props {
  children?: React.ReactNode;
}

const Dashboard: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [cardsInfo, setCardsInfo] = useState<tilesType>(
    accountSummaryStates.accounts
  );
  const [profileInfo, setProfile] = useState<profileType>(
    accountSummaryStates.profile
  );
  const [weeklyMonthlyYearlyInfo, setWeeklyMonthlyYearly] =
    useState<lineChartType>(accountSummaryStates.weeklyMonthlyYearly);
  const [txnWeeklyMonthlyYearlyInfo, setTxnWeeklyMonthlyYearly] =
    useState<lineChartType>(accountSummaryStates.weeklyMonthlyYearly);
  const [accountSummary, { loading, error, data }] =
    useLazyQuery(ACCOUNT_SUMMARY);

  useEffect(() => {
    accountSummary();
  }, [accountSummary]);

  useEffect(() => {
    if (!loading && !error && data) {
      const {
        accounts = {},
        profile = {},
        weeklyMonthlyYearly = {},
        txnWeeklyMonthlyYearly = {},
      } = data.accountSummary;
      setCardsInfo(accounts);
      setProfile(profile);
      setWeeklyMonthlyYearly(weeklyMonthlyYearly);
      setTxnWeeklyMonthlyYearly(txnWeeklyMonthlyYearly);
    }
  }, [loading, error, data]);

  const navigateTo = () => {
    navigate("/admin/open-account");
    navigate(0);
  };

  return (
    <DashboardStyle>
      {loading ? (
        <Loader />
      ) : (
        <>
          {cardsInfo?.savings?.length > 0 || cardsInfo?.credit?.length > 0 ? (
            <AccountInfo
              accounts={cardsInfo}
              profile={profileInfo}
              weeklyMonthlyYearly={weeklyMonthlyYearlyInfo}
              txnWeeklyMonthlyYearly={txnWeeklyMonthlyYearlyInfo}
            />
          ) : (
            <NoAccount
              openAccountLabel="Open New Account"
              applyCreditCardLabel="Apply Credit Card"
              navigateTo={navigateTo}
            />
          )}
        </>
      )}
    </DashboardStyle>
  );
};

export default Dashboard;
