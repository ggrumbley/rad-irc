import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import Views from './views';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

const App = (
  <ApolloProvider client={client}>
    <Views />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
