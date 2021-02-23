import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { createHttpLink } from "apollo-link-http";
import { setContext } from '@apollo/client/link/context';
import AUTH_TOKEN from '../Components/constants';


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: '/graphql'
    })
  ),
  cache: new InMemoryCache()
});


export default client;