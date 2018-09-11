import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  Input,
  Container,
  Header,
  Button
} from 'semantic-ui-react'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const res = await this.props.mutate({
      variables: this.state,
    });
    console.log(res);
  }

  render() {

    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          name="password"
          onChange={this.onChange}
          type="password"
          value={password}
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
};

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
