import styled, { css } from "styled-components";

import mq from "../../molecules/styled/MediaQueries";

const SearchStyle = styled.div`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    padding: ${props.theme.specing.spaceXxs};
    margin: ${props.theme.specing.spaceXxs};

    form {
      & > div {
        margin-right: 1em;
      }
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      ${mq.smallTabletUp(css`
        flex-direction: row;
      `)};
    }
  `}
`;

export default SearchStyle;
