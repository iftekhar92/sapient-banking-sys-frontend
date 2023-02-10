import { gql } from "@apollo/client";

export const AUTHENTICATION = gql`
  query {
    auth {
      status
      response {
        fullName
        userType
        status
        profilePic
      }
    }
  }
`;

export const LOGIN = gql`
  query login($input: loginlInput!) {
    login(input: $input) {
      error {
        key
        value
      }
      message
      severity
      response {
        fullName
        email
        phone
        userType
        status
      }
      token
    }
  }
`;

export const PROFILE_DETAIL = gql`
  query {
    findDetail {
      response {
        fullName
        phone
        occupation
        profilePic
      }
    }
  }
`;

export const FIND_ALL_INCOMES = gql`
  query findAllIncomes($input: statusInput!) {
    findAllIncomes(input: $input) {
      response {
        _id
        range
      }
    }
  }
`;

export const GET_TOKEN_TO_SET_PASSWORD = gql`
  query getTokenToSetPassword($input: emailWithKeyInput!) {
    getTokenToSetPassword(input: $input) {
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

export const INCOME_LIST = gql`
  query incomeList($input: nameTypeSearch!) {
    incomeList(input: $input) {
      total
      response {
        _id
        name
        from
        to
        range
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_INCOME_BY_ID = gql`
  query findIncomeById($input: idInput!) {
    findIncomeById(input: $input) {
      hasError
      response {
        _id
        name
        from
        to
        status
      }
    }
  }
`;
export const SAVINGS_ACCOUNT_LIST = gql`
  query savingsAccountList($input: nameTypeSearch!) {
    savingsAccountList(input: $input) {
      total
      response {
        _id
        name
        requiredAmount
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_SAVINGS_ACCOUNT_BY_ID = gql`
  query findSavingsAccountById($input: idInput!) {
    findSavingsAccountById(input: $input) {
      hasError
      response {
        _id
        name
        requiredAmount
        status
      }
    }
  }
`;

export const FIND_SAVINGS_ACCOUNTS = gql`
  query findAllSavingsAccount($input: statusInput!) {
    findAllSavingsAccount(input: $input) {
      response {
        _id
        name
      }
    }
  }
`;

export const PROOF_TYPE_LIST = gql`
  query proofTypeList($input: nameTypeSearch!) {
    proofTypeList(input: $input) {
      total
      response {
        _id
        name
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_PROOF_TYPE_BY_ID = gql`
  query findProofTypeById($input: idInput!) {
    findProofTypeById(input: $input) {
      hasError
      response {
        _id
        name
        status
      }
    }
  }
`;

export const GOVT_PROOF_LIST = gql`
  query findAllProofTypes($input: statusInput!) {
    findAllProofTypes(input: $input) {
      response {
        _id
        name
      }
    }
  }
`;

export const ACCOUNT_TYPE_LIST = gql`
  query accountTypeList($input: nameTypeSearch!) {
    accountTypeList(input: $input) {
      total
      response {
        _id
        name
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_ACCOUNT_TYPE_BY_ID = gql`
  query findAccountTypeById($input: idInput!) {
    findAccountTypeById(input: $input) {
      hasError
      response {
        _id
        name
        status
      }
    }
  }
`;

export const FIND_ACCOUNT_TYPES = gql`
  query findAllAccounts($input: statusInput!) {
    findAllAccounts(input: $input) {
      response {
        _id
        name
      }
    }
  }
`;

export const CARD_TYPE_LIST = gql`
  query cardTypeList($input: nameTypeSearch!) {
    cardTypeList(input: $input) {
      total
      response {
        _id
        name
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_CARD_TYPE_BY_ID = gql`
  query findCardTypeById($input: idInput!) {
    findCardTypeById(input: $input) {
      hasError
      response {
        _id
        name
        status
      }
    }
  }
`;

export const FIND_CARD_TYPES = gql`
  query findAllCardTypes($input: statusInput!) {
    findAllCardTypes(input: $input) {
      response {
        _id
        name
      }
    }
  }
`;

export const CARD_LIST = gql`
  query cardList($input: nameTypeSearch!) {
    cardList(input: $input) {
      total
      response {
        _id
        name
        accountType
        cardType
        annualIncome
        validityNoOfYear
        limitAmount
        annualCharge
        status
        action {
          view
          edit
          remove
        }
      }
    }
  }
`;
export const FIND_CARD_BY_ID = gql`
  query findCardById($input: idInput!) {
    findCardById(input: $input) {
      hasError
      response {
        _id
        name
        fkIncomeId
        fkAccountTypeId
        fkCardTypeId
        validityNoOfYear
        limitAmount
        annualCharge
        status
      }
    }
  }
`;

export const FIND_AVAILABLE_CARDS = gql`
  query findAvailableCards($input: statusInput!) {
    findAvailableCards(input: $input) {
      response {
        debitCard {
          _id
          name
        }
        creditCard {
          _id
          name
        }
      }
    }
  }
`;
export const SAVINGS_ACCOUNT = gql`
  query savingsAccount($input: accountInput!) {
    savingsAccount(input: $input) {
      message
      severity
      response {
        _id
        selection
        accountNumber
        fkSavingsAccount
        availableAmount
        startDate
        status
      }
    }
  }
`;
export const CREDIT_CARD_ACCOUNTS = gql`
  query creditCardsAccount($input: accountInput!) {
    creditCardsAccount(input: $input) {
      message
      severity
      response {
        _id
        selection
        cardNumber
        cardName
        limitAmount
        availableAmount
        outstandingAmount
        status
        startDate
        expiryDate
      }
    }
  }
`;
export const ACCOUNT_DETAILS = gql`
  query {
    fetchAccountDetails {
      message
      severity
      accountType {
        _id
        name
      }
      cards {
        _id
        name
      }
      accounts {
        _id
        name
      }
    }
  }
`;

export const ACCOUNT_PAYMENT_HISTORY = gql`
  query transactionHistory($input: transactionHistoryInput!) {
    transactionHistory(input: $input) {
      total
      response {
        txnId
        txnType
        accountNumber
        cardName
        accountInfo
        amount
        remark
        status
        paymentAt
      }
    }
  }
`;

export const ACCOUNT_SUMMARY = gql`
  query {
    accountSummary {
      accounts {
        savings {
          _id
          title
          amount
          overDueTitle
          overDueAmount
          accountInfo
          hasPayNowBtn
        }
        credit {
          _id
          title
          amount
          overDueTitle
          overDueAmount
          accountInfo
          hasPayNowBtn
        }
      }
      profile {
        name
        profilePic
        txnDetails {
          _id
          title
          link
          date
        }
      }
      weeklyMonthlyYearly {
        savingsLastWeek {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
        savingsLastMonth {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
        savingsLastYear {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
        creditCardLastweek {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
        creditCardLastMonth {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
        creditCardLastYear {
          labels
          datasets {
            label
            backgroundColor
            borderColor
            pointBackgroundColor
            pointBorderColor
            data
          }
        }
      }
      txnWeeklyMonthlyYearly {
        savingsLastWeek {
          labels
          datasets {
            backgroundColor
            data
          }
        }
        savingsLastMonth {
          labels
          datasets {
            backgroundColor
            data
          }
        }
        savingsLastYear {
          labels
          datasets {
            backgroundColor
            data
          }
        }
      }
    }
  }
`;
