import { createGlobalStyle, css } from "styled-components";
import settings from "./settings";
import mq from "../components/molecules/styled/MediaQueries";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${settings.fonts.fontStack};
  }

  a {
    text-decoration: none;

    &.profile-icon-link {
      img {
        width: 3em;
        max-height: ${settings.icons.iconXl};
      }
    }

  }
  form{
    &.is-scrollable{
      max-height: calc(100vh - 100px);
      overflow-y: scroll;
    }
    .image-sec {
      display: flex;
        flex-direction: column;
        ${mq.smallTabletUp(css`
          flex-direction: row;
          justify-content: flex-start;
        `)};
        &-label,
        &-preview {
          display: flex;
          flex-direction: column;
        }
        &-preview {
          margin-left: 1em;
        }
    }
  }
  .align-row {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: ${settings.specing.spaceXxs};

    .separator {
      margin: 0 ${settings.specing.spaceXxs};
    }
  }
  svg {
    &:hover{
      cursor:pointer;
    }
  }

  ul {
    &.link-list {
      padding-top: 0;
      margin-top: 0;

      li {
        padding-bottom: ${settings.specing.spaceXxxs};
      }
      a {
        font-size: ${settings.fontSize.fontSizeXsmall};
      }
    }
  }

  input, textarea, select {
    &.form-control {
    padding: ${settings.specing.spaceXxs};
    margin: ${settings.specing.spaceXxxs} 0 ${settings.specing.spaceXxxs} 0;
    border: ${settings.border.grey};
    &:focus {
      outline: none;
    }

    &.error {
      border: ${settings.border.error};
    }
  }
  &.medium {
    width: auto;
    ${mq.smallTabletUp(css`
      width: 300px;
    `)};
  }
  &.xmedium {
    width: auto;
    ${mq.smallTabletUp(css`
      width: 220px;
    `)};
  }
  &.xsmall {
    width: auto;
    ${mq.smallTabletUp(css`
      max-width: 240px;
    `)};
  }
}
.custom-width {
  ${mq.smallTabletUp(css`
    width: 300px;
  `)};
}
.error-msg {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .error {
    margin-right: auto;
  }

  &-hints {
    border: 1px solid darkgrey;
    color: darkgray;
    ${mq.smallTabletUp(css`
      margin-right: 0.5em;
    `)}; 
  }
}

.dot-class {
  .react-multi-carousel-dot{ 
  button {
    width: 1.5em;
    height: 1.5em;
  }
}
}
`;

export default GlobalStyle;
