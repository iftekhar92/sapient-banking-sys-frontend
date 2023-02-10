import React from "react";
import Anchor from "../../../components/atoms/Anchor/Anchor";
import Button from "../../../components/atoms/Button/Button";
import Title from "../../../components/atoms/Title/Title";
import Card from "../../../components/molecules/styled/Card";

import Carousel from "../../../components/organisms/Carousel/Carousel";
import Chart from "../../../components/organisms/Chart/Chart";
import { SAVINGS } from "../../../constants";
import {
  lineChartType,
  profileType,
  tilesType,
} from "../../../propTypes/propTypes";
import Profile from "../../molecules/Profile/Profile";
import TileItem from "./TileItem";

type Props = {
  accounts: tilesType;
  profile: profileType;
  weeklyMonthlyYearly: lineChartType;
  txnWeeklyMonthlyYearly: lineChartType;
};

const AccountInfo: React.FC<Props> = ({
  accounts,
  profile,
  weeklyMonthlyYearly,
  txnWeeklyMonthlyYearly,
}) => (
  <>
    <div className="sidebar-left">
      {Object.keys(accounts).length > 0 && (
        <div className="tile">
          {Object.keys(accounts).map((name: string) => {
            if (name === "__typename") return <></>;
            if(name.toLowerCase() === SAVINGS.toLowerCase() && accounts.savings.length === 0) return <></>
            if(name.toLowerCase() === 'credit' && accounts.credit.length === 0) return <></>
            return (
              <div key={name} className="tile__section">
                <Title customClass="sub-title">
                  {name.toLowerCase() === SAVINGS.toLowerCase()
                    ? "Your Savings Account"
                    : "Your Credit Card"}
                </Title>
                <Carousel
                  arrData={
                    name.toLowerCase() === SAVINGS.toLowerCase()
                      ? accounts.savings
                      : accounts.credit
                  }
                  ListItemComponent={TileItem}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="stats">
        <Chart
          title="Transactions"
          type="line"
          customClass="line-chart"
          records={weeklyMonthlyYearly}
        />
        <Chart
          title="Available Amount"
          type="doughnut"
          customClass="doughnut-chart"
          records={txnWeeklyMonthlyYearly}
        />
      </div>
      <Card alignItems="center" maxWidth="330px">
        <Title customClass="sub-title">
          Safety withdraw your money anywhere.
        </Title>
        <Anchor href="/admin/make-payment">
          <Button buttonType="secondary">Withdraw</Button>
        </Anchor>
      </Card>
    </div>
    <div className="sidebar-right">
      <Profile {...profile} />
    </div>
  </>
);

AccountInfo.defaultProps = {};

export default AccountInfo;
