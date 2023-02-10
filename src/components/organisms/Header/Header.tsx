import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

import HeaderStyle from "./Header.Style";
import Logo from "../../molecules/Logo/Logo";
import Image from "../../atoms/Image/Image";
import SideNav from "../SideNav/SideNav";
import ProfileNav from "../ProfileNav/ProfileNav";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import Anchor from "../../atoms/Anchor/Anchor";

type Props = {
  isMobile: true | false;
};

const Header: React.FC<Props> = ({ isMobile }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);
  const [state] = useStateValue();
  const { profilePic = "" } = state.user;

  const onClickHandlerMenu = () => {
    setProfileStatus(false);
    setMenuStatus(!menuStatus);
  };

  const onClickHandlerProfile = () => {
    setMenuStatus(false);
    setProfileStatus(!profileStatus);
  };

  const onClickLinkHandler = () => {
    setMenuStatus(false);
    setProfileStatus(false);
  };

  const ProfileImage:React.FC<{profilePic:string}> = ({profilePic}) => {
    if (profilePic) {
      return (
        <Anchor
          href="#"
          customClass="profile-icon-link"
          callback={(event) => {
            event.preventDefault();
            onClickHandlerProfile();
          }}
        >
          <Image
            src={`${process.env.REACT_APP_GATEWAY_LOCAL}/images/profile/${profilePic}`}
          />
        </Anchor>
      );
    }
    return <CgProfile size={30} onClick={() => onClickHandlerProfile()} />;
  };

  return (
    <HeaderStyle>
      <Logo link="/admin/dashboard" src="" />
      <div className="nav-section">
        <ProfileImage profilePic={profilePic} />
        {profileStatus && (
          <ProfileNav
            className="top-nav__menu profile"
            onClickHandler={onClickLinkHandler}
          />
        )}
        <div className="top-nav">
          {isMobile && (
            <GiHamburgerMenu size={30} onClick={() => onClickHandlerMenu()} />
          )}
          {isMobile && menuStatus && (
            <SideNav
              className="top-nav__menu"
              onClickHandler={onClickLinkHandler}
            />
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

Header.defaultProps = {
  isMobile: false,
};

export default Header;
