import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Modal from "../../../components/organisms/Modal/Modal";
import Loader from "../../../components/atoms/LoadingIcon/LoadingIcon";
import ErrorPage from "../../../components/molecules/Error/Error";
import Header from "../../../components/organisms/Header/Header";
import Footer from "../../../components/organisms/Footer/Footer";
import SideNav from "../../../components/organisms/SideNav/SideNav";
import Container from "../../../components/molecules/styled/Container";
import Main from "../../../components/molecules/styled/Main";

import { AUTHENTICATION } from "../../../constants/Query";
import { useStateValue } from "../../../contextWrapper/ContextWrapper";
import { SET_USER_LOGGED_IN } from "../../../constants";

interface Props {
  children: React.ReactNode;
}

const Admin: React.FC<Props> = ({ children }) => {
  const [, dispatch] = useStateValue();
  const [queryStatus, setQueryStatus] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("Unauthenticated user!");
  const { loading, error, data } = useQuery(AUTHENTICATION);

  useEffect(() => {
    if (!loading && !error && data) {
      const { status: userStatus, response } = data.auth;
      if (userStatus && response) {
        const {
          fullName = "",
          userType = "",
          profilePic = "",
          status = "INACTIVE",
        } = response;
        if (status === "ACTIVE") {
          const payload = {
            isLoggedIn: true,
            fullName,
            userType,
            status,
            profilePic,
          };
          dispatch({ type: SET_USER_LOGGED_IN, payload });
          setQueryStatus(true);
        } else {
          setMessage(
            "Your profile is not active yet. Please contact to administrator."
          );
          setQueryStatus(false);
        }
      } else {
        setQueryStatus(false);
      }
    }
  }, [loading, error, data, dispatch]);

  // choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 821) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && error) {
    return (
      <ErrorPage className="unauth" type={201} message="Query Process Failed" />
    );
  }

  if (!loading && !error && !queryStatus) {
    return <ErrorPage className="process" type={200} message={message} />;
  }

  return (
    <Main>
      <Header isMobile={isMobile} />
      <div className="container">
        <div className="inner-content">
          {!isMobile && <SideNav />}
          <Container className="right-side">{children}</Container>
        </div>
        <Footer />
        <Modal />
      </div>
    </Main>
  );
};

export default Admin;
