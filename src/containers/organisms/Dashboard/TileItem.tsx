import React from "react";
import Anchor from "../../../components/atoms/Anchor/Anchor";

import Button from "../../../components/atoms/Button/Button";
import { tileTypes } from "../../../propTypes/propTypes";

const TileItem: React.FC<tileTypes> = ({
  title,
  amount,
  overDueTitle,
  overDueAmount,
  hasPayNowBtn,
  accountInfo,
}) => (
  <div className="tile__section__item">
    <div className="tile__section__item__info">
      {title && <div className="title">{title}</div>}
      {amount && <div className="amount">{amount}</div>}
      {overDueTitle && <div className="title">{overDueTitle}</div>}
      {overDueAmount && (
        <div className="amount">
          {overDueAmount}{" "}
          {hasPayNowBtn && <Anchor href="/admin/make-payment"><Button customClass="pay-now-btn">Pay Now</Button></Anchor>}
        </div>
      )}
      {accountInfo && <div className="account-info">{accountInfo}</div>}
    </div>
  </div>
);

TileItem.defaultProps = {
  customClass: "",
  title: "",
  amount: "",
  overDueTitle: "",
  overDueAmount: "",
  hasPayNowBtn: false,
  accountInfo: "",
};

export default TileItem;
