import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";

import NavStyles from "./Nav.Style";
import settings from "../../../theme/settings";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import Anchor from "../../atoms/Anchor/Anchor";

type Props = {
  className?: string;
  onClickHandler?: () => void;
};

const SideNav: React.FC<Props> = ({ className, onClickHandler }) => {
  const [state] = useStateValue();
  const { userType = "" } = state.user;
  return (
    <NavStyles className={className}>
      <ul>
      <li>
          <Anchor
            href="/admin/dashboard"
            ariaLabel="Dashboard"
            callback={onClickHandler}
          >
            <MdOutlineContentCopy
              size={25}
              color={settings.solidColors.blue}
              title="Dashboard"
            />
            <span>Dashboard</span>
          </Anchor>
        </li>
        {userType === "ADMIN" && (
          <>
            <li>
              <Anchor
                href="/admin/govt-proof"
                ariaLabel="Govt. Proof"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Govt. Proof"
                />
                <span>Govt. Proof</span>
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/admin/income"
                ariaLabel="Income"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Income"
                />
                <span>Income</span>
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/admin/account-type"
                ariaLabel="Account Type"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Account Type"
                />
                <span>Account Type</span>
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/admin/savings-account"
                ariaLabel="Savings Account"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Savings Account"
                />
                <span>Savings Account</span>
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/admin/card-type"
                ariaLabel="Card Type"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Card Type"
                />
                <span>Card Type</span>
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/admin/cards"
                ariaLabel="Cards"
                callback={onClickHandler}
              >
                <MdOutlineContentCopy
                  size={25}
                  color={settings.solidColors.blue}
                  title="Cards"
                />
                <span>Cards</span>
              </Anchor>
            </li>
          </>
        )}
        <li>
          <Anchor
            href="/admin/open-account"
            ariaLabel="Open Account"
            callback={onClickHandler}
          >
            <MdOutlineContentCopy
              size={25}
              color={settings.solidColors.blue}
              title="Open Account"
            />
            <span>Open Account</span>
          </Anchor>
        </li>
        <li>
          <Anchor
            href="/admin/make-payment"
            ariaLabel="Make Payment"
            callback={onClickHandler}
          >
            <MdOutlineContentCopy
              size={25}
              color={settings.solidColors.blue}
              title="Make Payment"
            />
            <span>Make Payment</span>
          </Anchor>
        </li>
        <li>
          <Anchor
            href="/admin/history/savings"
            ariaLabel="Savings Account History"
            callback={onClickHandler}
          >
            <MdOutlineContentCopy
              size={25}
              color={settings.solidColors.blue}
              title="Savings Account History"
            />
            <span>Savings Account History</span>
          </Anchor>
        </li>
        <li>
          <Anchor
            href="/admin/history/credit-cards"
            ariaLabel="Credit Cards History"
            callback={onClickHandler}
          >
            <MdOutlineContentCopy
              size={25}
              color={settings.solidColors.blue}
              title="Credit Cards History"
            />
            <span>Credit Cards History</span>
          </Anchor>
        </li>
      </ul>
    </NavStyles>
  );
};

SideNav.defaultProps = {
  className: "",
  onClickHandler: () => {},
};

export default SideNav;
