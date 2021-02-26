import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './Config/gql-config.js'

import RouteConfig from './Route.js'
import { AuthProvider } from './context'

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
          <RouteConfig />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
