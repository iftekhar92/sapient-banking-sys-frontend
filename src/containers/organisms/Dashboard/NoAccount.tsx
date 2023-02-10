import React from "react";

import { AdminWithoutLogInContainer } from "../../../components/molecules/styled/AdminWithoutLogInContainer";
import Button from "../../../components/atoms/Button/Button";
import Card from "../../../components/molecules/styled/Card";
import Message from "../../../components/molecules/Message/Message";

type Props = {
  openAccountLabel: string;
  applyCreditCardLabel: string;
  message?: string;
  navigateTo: (event?: React.MouseEvent<HTMLElement>) => void;
};

const NoAccount: React.FC<Props> = ({
  openAccountLabel,
  applyCreditCardLabel,
  message,
  navigateTo,
}) => (
  <AdminWithoutLogInContainer
    maxWidth="600px"
    alignCenter={true}
    className="no-account"
  >
    <Card>
      <Message customClass="info">{message}</Message>
      <Button ariaLabel={openAccountLabel} callback={() => navigateTo()}>
        {openAccountLabel}
      </Button>
      <Button ariaLabel={applyCreditCardLabel} callback={() => navigateTo()}>
        {applyCreditCardLabel}
      </Button>
    </Card>
  </AdminWithoutLogInContainer>
);

NoAccount.defaultProps = {
  openAccountLabel: "",
  applyCreditCardLabel: "",
  message:
    "You don't have A/c yet. Create new A/c or apply Credit card by clicking below links.",
  navigateTo: () => {},
};

export default NoAccount;
