import {ApolloProvider} from '@apollo/client'
import client from './Config/gql-config.js'

import RouteConfig from './Route.js'
import Login from './Components/login.js'

function App() {
  return (
    <ApolloProvider client={client}>
    <RouteConfig>
      <Login />
    </RouteConfig>
    </ApolloProvider>

  );
}

export default App;
