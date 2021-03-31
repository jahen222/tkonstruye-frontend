import gql from "graphql-tag";

export const PROFILE_UPDATE_USER_DATA = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $phone: String!
    $name: String
    $rut: String
    $slogan: String
    $commune: ID
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: {
          username: $username
          email: $email
          phone: $phone
          name: $name
          rut: $rut
          slogan: $slogan
          commune: $commune
        }
      }
    ) {
      user {
        id
        name
        username
        email
        phone
        slogan
        rut
        photo {
          url
        }
        commune {
          id
          name
          city {
            name
            region {
              name
              country {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const PROFILE_UPDATE_COMPANY_DATA = gql`
  mutation updateUser($id: ID!, $giro: String, $contact: String) {
    updateUser(
      input: { where: { id: $id }, data: { giro: $giro, contact: $contact } }
    ) {
      user {
        id
        giro
        contact
      }
    }
  }
`;

export const PROFILE_FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;
