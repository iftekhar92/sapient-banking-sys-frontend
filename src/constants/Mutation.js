import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($input: signupInput!) {
    signup(input: $input) {
      error {
        key
        value
      }
      message
      severity
      token
    }
  }
`;

export const SET_PASSWORD = gql`
  mutation setPassword($input: setPasswordInput!) {
    setPassword(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: changePasswordInput!) {
    changePassword(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: updateProfileInput!) {
    updateProfile(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation removeIncome($input: idInput!) {
    removeIncome(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_INCOME = gql`
  mutation createIncome($input: incomeInput!) {
    createIncome(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_INCOME = gql`
  mutation updateIncome($input: incomeInput!) {
    updateIncome(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const DELETE_SAVINGS_ACCOUNT = gql`
  mutation removeSavingsAccount($input: idInput!) {
    removeSavingsAccount(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_SAVINGS_ACCOUNT = gql`
  mutation createSavingsAccount($input: savingAccountInput!) {
    createSavingsAccount(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_SAVINGS_ACCOUNT = gql`
  mutation updateSavingsAccount($input: savingAccountInput!) {
    updateSavingsAccount(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const DELETE_PROOF_TYPE = gql`
  mutation removeProofType($input: idInput!) {
    removeProofType(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_PROOF_TYPE = gql`
  mutation createProofType($input: nameInput!) {
    createProofType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_PROOF_TYPE = gql`
  mutation updateProofType($input: nameInput!) {
    updateProofType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const DELETE_ACCOUNT_TYPE = gql`
  mutation removeAccountType($input: idInput!) {
    removeAccountType(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_ACCOUNT_TYPE = gql`
  mutation createAccountType($input: nameInput!) {
    createAccountType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_ACCOUNT_TYPE = gql`
  mutation updateAccountType($input: nameInput!) {
    updateAccountType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const DELETE_CARD_TYPE = gql`
  mutation removeCardType($input: idInput!) {
    removeCardType(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_CARD_TYPE = gql`
  mutation createCardType($input: nameInput!) {
    createCardType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_CARD_TYPE = gql`
  mutation updateCardType($input: nameInput!) {
    updateCardType(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const DELETE_CARD = gql`
  mutation removeCard($input: idInput!) {
    removeCard(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CREATE_CARD = gql`
  mutation createCard($input: cardInput!) {
    createCard(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const EDIT_CARD = gql`
  mutation updateCard($input: cardInput!) {
    updateCard(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const OPEN_ACCOUNT = gql`
  mutation openAccount($input: openAccountInput!) {
    openAccount(input: $input) {
      error {
        key
        value
      }
      message
      severity
      isAccountCreated
      isCardCreated
      type
    }
  }
`;

export const MAKE_TRANSACTION = gql`
  mutation makeTransaction($input: makeTransactionInput!) {
    makeTransaction(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const REMOVE_SAVINGS_ACCOUNT = gql`
  mutation removeSavingsAccount($input: idInput!) {
    removeSavingsAccount(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const REMOVE_ACCOUNTS_PAYMENT = gql`
  mutation {
    removeAccountAndPaymentHistory {
    hasError
    message
    severity
    }
  }
`;
