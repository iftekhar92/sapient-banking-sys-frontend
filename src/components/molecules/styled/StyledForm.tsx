import styled, { css } from "styled-components";

import mq from "./MediaQueries";

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .form-container {
      display: flex;
      flex-direction: column;
      width: -webkit-fill-available;
      padding-right: 1em;
      ${mq.smallTabletUp(css`
        flex-direction: row;
        justify-content: flex-start;
      `)};
      &__full-width {
        ${mq.smallTabletUp(css`
          flex-direction: row;
          justify-content: space-between;
        `)};
      }
      &__aligh-left-right {
        width: 100%;
        ${mq.smallTabletUp(css`
          width: 49%;
        `)};
      }
      &-vertical {
        flex-direction: column;

        .btn {
          width: fit-content;
        }
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
  }
`;

export default StyledForm;
