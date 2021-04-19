import gql from "graphql-tag";

export const HEADER_USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;
