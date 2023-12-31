import gql from "graphql-tag";

export const HEADER_USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
        role {
          id
          name
        }
      }
    }
  }
`;

export const HEADER_USER_REGISTER = gql`
  mutation createUser2(
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
    $role: ID!
    $balance: Float!
  ) {
    createuser2(
      username: $username
      email: $email
      password: $password
      phone: $phone
      role: $role
      balance: $balance
    ) {
      users_permissions_user {
        id
      }
    }
  }
`;

export const HEADER_USER_REGISTER_BK = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $phone: String!
    $role: ID!
  ) {
    createUser(
      input: {
        data: {
          username: $username
          email: $email
          password: $password
          phone: $phone
          role: $role
        }
      }
    ) {
      user {
        id
      }
    }
  }
`;
