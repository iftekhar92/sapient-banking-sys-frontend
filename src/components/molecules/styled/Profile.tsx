import styled from "styled-components";
import settings from "../../../theme/settings";

export const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${settings.specing.spaceS};
  box-shadow: ${settings.shadow.light};
  padding: ${settings.specing.spaceS};
  background-color: ${settings.transparentColors.lightGray6};
  border-radius: 5px;

  img.profile-pic {
    width: 110px;
    height: 120px;
    padding: ${settings.specing.spaceS};
    border-radius: 5px;
    border: ${settings.border.lightgrey};
  }
  .sub-title {
    font-size: ${settings.fontSize.fontSizeH4};
  }
  .profile-action {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  button.icon-btn {
    padding: ${settings.specing.spaceXxxs};
    margin: 0;
  }

  .txn-details {
    width: 90%;
    border-top: ${settings.border.lightgrey};
    padding-top: ${settings.specing.spaceM};
    .padding-bottom {
        margin-bottom: ${settings.specing.spaceM};
    }
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: ${settings.specing.spaceS};
      &-desc {
        display: flex;
        flex-direction: column;
        row-gap: ${settings.specing.spaceXxs};
      }
    }
    .name {
      font-size: ${settings.fontSize.fontSizeSmall};
    }
    .date {
      color: lightgrey;
      font-size: ${settings.fontSize.fontSizeXsmall};
    }
  }
`;
