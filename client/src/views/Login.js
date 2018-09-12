import React from 'react';
import { observer } from 'mobx-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { extendObservable } from 'mobx';
import { Input, Container, Header, Button } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { email, password } = this;
    const res = await this.props.mutate({
      variables: { email, password },
    });
    console.log(res);
    const { ok, token, refreshToken } = res.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as="h2">Login</Header>

        <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
        <Input
          name="password"
          onChange={this.onChange}
          type="password"
          value={password}
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}> Submit </Button>
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
