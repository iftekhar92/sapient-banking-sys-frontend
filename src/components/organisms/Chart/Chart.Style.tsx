import styled, {css} from "styled-components";
import settings from "../../../theme/settings";

import mq from "../../molecules/styled/MediaQueries";

const ChartStyle = styled.div`
  display: flex;
  flex-direction:column;
  margin-bottom: ${settings.specing.spaceS};
  .header {
    display:flex;
    flex-direction: column;
    align-items: center;
    .sub-title {
      padding: 0 ${settings.specing.spaceXxs}; 0 0;
    }
    select {
      width: 180px !important;
    }
    ${mq.desktopUp(css`
      flex-direction: row;
      justify-content: flex-start;
    `)};
  }
  
`;

export default ChartStyle;
