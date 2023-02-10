import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

import NavStyles from "./Nav.Style";
import settings from "../../../theme/settings";
import { deleteCookie } from "../../../utils/utils";

type Props = {
  className?: string;
  onClickHandler: () => void;
};

const ProfileNav: React.FC<Props> = ({ className, onClickHandler }) => {
  const navigate = useNavigate();

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    deleteCookie(process.env.REACT_APP_TOKEN_KEY, "", 0);
    navigate("/login");
    navigate(0);
  };

  return (
    <NavStyles className={className}>
      <ul>
        <li>
          <Link to="/admin/update-profile" onClick={onClickHandler}>
            <CgProfile
              size={25}
              color={settings.solidColors.blue}
              title="Update Profile"
            />
            <span>Update Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/change-password" onClick={onClickHandler}>
            <RiLockPasswordLine
              size={25}
              color={settings.solidColors.blue}
              title="Change Password"
            />
            <span>Change Password</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/logout" onClick={(event) => logout(event)}>
            <AiOutlineLogout
              size={25}
              color={settings.solidColors.blue}
              title="Logout"
            />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </NavStyles>
  );
};

ProfileNav.defaultProps = {
  className: "",
  onClickHandler: () => {},
};

export default ProfileNav;
