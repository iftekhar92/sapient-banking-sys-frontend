import styled, { css } from "styled-components";

import mq from "../../molecules/styled/MediaQueries";

const TableStyle = styled.div`
  ${(props) => css`
    overflow-x: scroll;
    width: 100%;
    display: block;

    table {
      overflow-x: auto;
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5em;
      border: none;
      table-layout: fixed;

      thead tr {
        background: ${props.theme.solidColors.blue8};
        color: ${props.theme.solidColors.white};
        border-top: 1px solid ${props.theme.solidColors.blue};
      }

      tbody tr {
        border-top: 1px solid ${props.theme.solidColors.blue};
      }

      td,
      th {
        width: 20vw;
        text-align: left;
        padding: 0 ${props.theme.specing.spaceXxs};
        word-break:keep-all;
      }

      th {
        font-size: ${props.theme.fontSize.fontSizeH4};
        font-weight: 500;
        margin-bottom: 0.5em;
        line-height: 1.6em;
        margin-top: 0;
        border: none;
      }

      td {
        font-size: ${props.theme.fontSize.fontSizeXsmall};
        font-weight: 300;
        line-height: 1.6em;
        color: #2d3439;
        letter-spacing: 0.02em;
        margin-bottom: 1em;
        margin-top: 0;
        border: 1px solid #c6cdd2;

        .td-img {
          text-align: center;
        }
        
        .actions {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
      }

      ${mq.smallTabletUp(css`
        table-layout: unset;
        td:first-child:last-child {
          width: 100%;
        }
        td:first-child:nth-last-child(2),
        td:first-child:nth-last-child(2) ~ td {
          width: 49%;
        }
        td:first-child:nth-last-child(3),
        td:first-child:nth-last-child(3) ~ td {
          width: 32%;
        }
        td:first-child:nth-last-child(4),
        td:first-child:nth-last-child(4) ~ td {
          width: 23%;
        }
        td:first-child:nth-last-child(5),
        td:first-child:nth-last-child(5) ~ td {
          width: 18%;
        }
        td:first-child:nth-last-child(6),
        td:first-child:nth-last-child(6) ~ td {
          width: 15%;
        }
        td:first-child:nth-last-child(7),
        td:first-child:nth-last-child(7) ~ td {
          width: 13%;
        }
        td:first-child:nth-last-child(8),
        td:first-child:nth-last-child(8) ~ td {
          width: 11%;
        }
      `)};
    }
  `}
`;

export default TableStyle;
