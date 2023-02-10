import styled from "styled-components";

import settings from "../../../theme/settings";

export const CarouselStyle = styled.div`
  .crousel {
    &-ul {
      background-color:  ${settings.solidColors.white};
      &-li {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;
