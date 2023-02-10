import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/atoms/Button/Button";
import Title from "../../../components/atoms/Title/Title";
import Hr from "../../../components/atoms/Hr/Hr";
import SubHeader from "../../../components/molecules/styled/SubHeader";
import SubContainer from "../../../components/molecules/styled/SubContainer";

type Props = {
  title?: string;
  addNewLink?: string;
  addNewBtnTxt?:string;
  searchToggleAction?: () => void;
  searchBtnTxt?: string;
  additionalAction?: () => React.ReactNode | string;
};

const SubHeaderAction: React.FC<Props> = ({
  title,
  addNewLink,
  addNewBtnTxt,
  searchToggleAction,
  searchBtnTxt,
  additionalAction
}) => {
  const navigate = useNavigate();
  return (
    <SubHeader hasBorder={true}>
      {title && (
        <SubContainer isAlwaysVertical={true}>
          <Title>{title}</Title>
          <Hr heightType="wide" widthType="small" />
        </SubContainer>
      )}
      <SubContainer isAlwaysVertical={false}>
        {additionalAction && additionalAction()}
        {addNewLink && addNewBtnTxt && (
          <Button buttonType="primary" callback={() => navigate(addNewLink)}>
            {addNewBtnTxt}
          </Button>
        )}
        {searchBtnTxt && <Button buttonType="primary" callback={searchToggleAction}>
          {searchBtnTxt}
        </Button>}
      </SubContainer>
    </SubHeader>
  );
};

SubHeaderAction.defaultProps = {
  title: "",
  addNewLink: "",
  addNewBtnTxt: "",
  searchToggleAction: () => {},
  searchBtnTxt: "",
  additionalAction: () => <></>
};

export default SubHeaderAction;
