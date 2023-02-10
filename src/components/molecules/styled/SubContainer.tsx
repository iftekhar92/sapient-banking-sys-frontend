import styled, { css } from "styled-components";

type Props = {
  isAlwaysVertical: boolean;
};

const SubContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.isAlwaysVertical &&
    css`
      flex-direction: column;
    `};
  ${(props) =>
    !props.isAlwaysVertical &&
    css`
      flex-direction: row;
      justify-content: flex-start;
    `};
    &.margin-bottom {
      margin-bottom: .5em;
    }
`;

export default SubContainer;
