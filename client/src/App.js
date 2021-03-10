import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './Config/gql-config.js'

import RouteConfig from './Route.js'

function App() {
  return (
    <ApolloProvider client={client}>
      <RouteConfig />
    </ApolloProvider>
  );
}

export default App;
