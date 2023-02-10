import React from "react";
import styled from 'styled-components';

import Container from "../../../components/molecules/styled/Container";

interface Props {
  children: React.ReactNode;
}

const Main = styled.main`
    width: 100%;
`;

const NoHeaderNoFooter: React.FC<Props> = ({ children }) => {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  );
};

export default NoHeaderNoFooter;
