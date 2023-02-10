import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat
} from '@apollo/client';

import { getCookie } from './utils/utils';

const token = getCookie(process.env.REACT_APP_TOKEN_KEY) || '';
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_ENV === 'local'
      ? `${process.env.REACT_APP_GATEWAY_LOCAL}/graphql`
      : `${process.env.REACT_APP_GATEWAY_LIVE}/graphql`
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  defaultOptions
});

export default client;
