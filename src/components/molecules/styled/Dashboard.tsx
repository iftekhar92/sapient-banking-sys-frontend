import styled, { css } from "styled-components";

import mq from "./MediaQueries";
import settings from "../../../theme/settings";

export const DashboardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  padding-bottom:1em;

  ${mq.desktopUp(css`
    flex-direction: row;
    justify-content: space-between;
    align-items:baseline;
  `)};
  .sidebar-left {
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    ${mq.desktopUp(css`
      width: 70%;
    `)};
  }
  .sidebar-right {
    width: 91%;
    padding: ${settings.specing.spaceS};
    ${mq.desktopUp(css`
      width: 27%;
     
    `)};
  }

  .sub-title {
    font-size: ${settings.fontSize.fontSizeH4};
  }

  .tile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: -webkit-fill-available;
    ${mq.desktopUp(css`
      flex-direction: row;
      justify-content: space-between;
    `)};
    &__section {
      padding: 1em;
      ${mq.desktopUp(css`
        width: 48%;
      `)};
      &__item {
        box-shadow: ${settings.shadow.light};
        padding: ${settings.specing.spaceS};
        background-color: ${settings.solidColors.blue8};
        color: ${settings.solidColors.white};
        font-size: ${settings.fontSize.fontSizeH4};
        border-radius: 5%;
        width: -webkit-fill-available;

        &__info {
          display: flex;
          flex-direction: column;
          row-gap: ${settings.specing.spaceS};

          .title {
            font-size: ${settings.fontSize.fontSizeH4};
          }
          .amount {
            font-size: ${settings.fontSize.fontSizeSH1};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .pay-now-btn {
              margin: 0;
              padding: ${settings.specing.spaceXxxs};
              border-radius: 5px;
              font-size: ${settings.fontSize.fontSizeXXSmall};
            }
          }
        }
      }
    }
  }
  .stats {
    display:flex;
    flex-direction: column;
    width: 100%;
    ${mq.desktopUp(css`
      flex-direction: row;
      justify-content: space-between;
      .line-chart {
        width: 65%;
      }
      .doughnut-chart {
        width: 35%;
      }
    `)};
  }
`;
