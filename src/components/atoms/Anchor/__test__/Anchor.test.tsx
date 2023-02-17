import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Anchor from "../Anchor";
describe('<Anchor />', () => {


test('renders learn react link', () => {
  const props = {
    customClass: "drret",
    wrapperCustomClass: "",
    isExternal: false,
    href: "#",
    dataSetType: "",
    dataSetResource: "",
    ariaLabel: "",
    callback: () => {},
  };
  render(<MemoryRouter><Anchor {...props}>Hello</Anchor></MemoryRouter>);
});
})
