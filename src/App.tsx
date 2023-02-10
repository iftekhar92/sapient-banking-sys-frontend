import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";

import client from "./apolloClient";
import reducerWithMiddleWare from "./reducers";
import { StateProvider } from "./contextWrapper/ContextWrapper";
import { user, modal, message } from "./libs/initialState";

import settings from "./theme/settings";
import GlobalStyle from "./theme/GlobalStyle";
import Loader from "./components/atoms/LoadingIcon/LoadingIcon";
const Error = lazy(() => import("./components/molecules/Error/Error"));
const LogiIn = lazy(() => import("./containers/templates/Login/Login"));
const Signup = lazy(() => import("./containers/templates/Signup/Signup"));
const UpdatePasswordRequest = lazy(
  () =>
    import("./containers/templates/UpdatePasswordRequest/UpdatePasswordRequest")
);
const SetPassword = lazy(
  () => import("./containers/templates/SetPassword/SetPassword")
);
const AdminLayout = lazy(() => import("./containers/organisms/Layouts/Admin"));
const Dashboard = lazy(
  () => import("./containers/templates/Dashboard/Dashboard")
);
const UpdateProfile = lazy(
  () => import("./containers/templates/UpdateProfile/UpdateProfile")
);
const ChangePassword = lazy(
  () => import("./containers/templates/ChangePassword/ChangePassword")
);
const IncomeList = lazy(() => import("./containers/templates/Income/Income"));
const CreateIncome = lazy(
  () => import("./containers/templates/Income/CreateIncome")
);
const UpdateIncome = lazy(
  () => import("./containers/templates/Income/UpdateIncome")
);
const SavingsAccount = lazy(
  () => import("./containers/templates/SavingsAccount/SavingsAccount")
);
const CreateSavingsAccount = lazy(
  () => import("./containers/templates/SavingsAccount/CreateSavingsAccount")
);
const UpdateSavingsAccount = lazy(
  () => import("./containers/templates/SavingsAccount/UpdateSavingsAccount")
);
const GovtProof = lazy(
  () => import("./containers/templates/GovtProof/GovtProof")
);
const CreateGovtProof = lazy(
  () => import("./containers/templates/GovtProof/CreateGovtProof")
);
const UpdateGovtProof = lazy(
  () => import("./containers/templates/GovtProof/UpdateGovtProof")
);
const AccountType = lazy(
  () => import("./containers/templates/AccountType/AccountType")
);
const CreateAccountType = lazy(
  () => import("./containers/templates/AccountType/CreateAccountType")
);
const UpdateAccountType = lazy(
  () => import("./containers/templates/AccountType/UpdateAccountType")
);
const CardType = lazy(() => import("./containers/templates/CardType/CardType"));
const CreateCardType = lazy(
  () => import("./containers/templates/CardType/CreateCardType")
);
const UpdateCardType = lazy(
  () => import("./containers/templates/CardType/UpdateCardType")
);
const Cards = lazy(() => import("./containers/templates/Card/Cards"));
const CreateCard = lazy(() => import("./containers/templates/Card/CreateCard"));
const UpdateCard = lazy(() => import("./containers/templates/Card/UpdateCard"));

const OpenAccount = lazy(
  () => import("./containers/templates/OpenAccount/OpenAccount")
);
const MakeTransation = lazy(
  () => import("./containers/templates/MakeTransation/MakeTransation")
);
const SavingsAccountList = lazy(
  () => import("./containers/templates/SavingsAccountList/SavingsAccountList")
);
const CreditCardList = lazy(
  () => import("./containers/templates/CreditCardsList/CreditCardList")
);

const initialState = { user, modal, message };

type Props = {
  children: any;
};

const Wrapper: React.FC<Props> = ({ children }) => (
  <StateProvider reducer={reducerWithMiddleWare} initialState={initialState}>
    {children}
  </StateProvider>
);

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <ThemeProvider theme={settings}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Wrapper>
                    <LogiIn />
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  <Wrapper>
                    <Signup />
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/:type/password/:token"
                element={
                  <Wrapper>
                    <SetPassword />
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/:type/password"
                element={
                  <Wrapper>
                    <UpdatePasswordRequest />
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/login"
                element={
                  <Wrapper>
                    <LogiIn />
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/dashboard"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/update-profile"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateProfile />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/change-password"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <ChangePassword />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/income"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <IncomeList />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/income/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateIncome />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/income/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateIncome />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/savings-account"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <SavingsAccount />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/savings-account/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateSavingsAccount />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/savings-account/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateSavingsAccount />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/govt-proof"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <GovtProof />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/govt-proof/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateGovtProof />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/govt-proof/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateGovtProof />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/account-type"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <AccountType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/account-type/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateAccountType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/account-type/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateAccountType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/card-type"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CardType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/card-type/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateCardType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/card-type/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateCardType />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/cards"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <Cards />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/cards/create"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreateCard />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/cards/update/:id"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <UpdateCard />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/open-account"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <OpenAccount />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/history/savings"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <SavingsAccountList />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/history/credit-cards"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <CreditCardList />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="/admin/make-payment"
                element={
                  <Wrapper>
                    <AdminLayout>
                      <MakeTransation />
                    </AdminLayout>
                  </Wrapper>
                }
              ></Route>
              <Route
                path="*"
                element={<Error type={404} className="error" />}
              />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
