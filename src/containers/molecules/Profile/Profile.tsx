import React from "react";
import { FiEdit2 } from "react-icons/fi";

import { ProfileStyle } from "../../../components/molecules/styled/Profile";
import Title from "../../../components/atoms/Title/Title";
import Image from "../../../components/atoms/Image/Image";
import Button from "../../../components/atoms/Button/Button";
import Anchor from "../../../components/atoms/Anchor/Anchor";
import { lastTxnDetails, profileType } from "../../../propTypes/propTypes";

const Profile: React.FC<profileType> = ({
  customClass,
  name,
  profilePic,
  txnDetails,
}) => (
  <ProfileStyle className={customClass}>
    <Title customClass="sub-title">My Profile</Title>
    <Image
      customClass="profile-pic"
      name={name}
      src={profilePic || "CgProfile"}
      svgWidth={100}
    />
    <Title customClass="sub-title">{name}</Title>
    <div className="profile-action">
      <Anchor href="/admin/update-profile">
        <Button buttonType="secondary" customClass="icon-btn">
          <FiEdit2 title="Edit Profile" size={20} />
        </Button>
      </Anchor>
      <Anchor href="/admin/update-profile">
        <Button buttonType="secondary">View full profile</Button>
      </Anchor>
    </div>
    {txnDetails.length > 0 && (
      <div className="txn-details">
        <Title customClass="sub-title padding-bottom">
          Your last transaction
        </Title>
        {txnDetails.map((x: lastTxnDetails) => (
          <div key={x.title} className="txn-details-item">
            <div className="txn-details-item-desc">
              <div className="name">
                <strong>{x.title}</strong>
              </div>
              <Anchor href={x.link || "/admin/dashboard"}>View details</Anchor>
            </div>
            <div className="date">{x.date}</div>
          </div>
        ))}
      </div>
    )}
  </ProfileStyle>
);

Profile.defaultProps = {
  customClass: "",
  profilePic: "",
  txnDetails: [],
};

export default Profile;
