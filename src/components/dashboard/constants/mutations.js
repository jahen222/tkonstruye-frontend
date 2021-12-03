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
          id
          url
        }
        commune {
          id
          name
          city {
            id
            name
            region {
              id
              name
              country {
                id
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

export const PROFILE_UPLOAD_PHOTO = gql`
  mutation upload($file: Upload!) {
    upload(file: $file) {
      id
      name
    }
  }
`;

export const PROFILE_UPDATE_PHOTO = gql`
  mutation updateUser($id: ID!, $photo: ID) {
    updateUser(input: { where: { id: $id }, data: { photo: $photo } }) {
      user {
        id
        photo {
          id
          url
        }
      }
    }
  }
`;

export const TICKETS_UPDATE_TICKET = gql`
  mutation updateTicket(
    $id: ID!
    $subCategory: ID!
    $usersPermissionsUser: ID!
    $commune: ID!
    $requirements: JSON
    $description: String
  ) {
    updateTicket(
      input: {
        where: { id: $id }
        data: {
          subcategory: $subCategory
          users_permissions_user: $usersPermissionsUser
          commune: $commune
          requirements: $requirements
          description: $description
        }
      }
    ) {
      ticket {
        id
        subcategory {
          id
          name
        }
        users_permissions_user {
          id
          name
        }
        commune {
          id
          name
        }
        requirements
        description
      }
    }
  }
`;

export const TICKETS_DELETE_TICKET = gql`
  mutation deleteTicket($id: ID!) {
    deleteTicket(input: { where: { id: $id } }) {
      ticket {
        id
      }
    }
  }
`;

export const CATEGORIES_UPDATE_USER_SUBCATEGORIES = gql`
  mutation updateUser($id: ID!, $subCategories: [ID]) {
    updateUser(
      input: { where: { id: $id }, data: { subcategories: $subCategories } }
    ) {
      user {
        id
        subcategories {
          id
        }
      }
    }
  }
`;

export const PAYMENT_CREATE_CARD = gql`
  mutation createCard(
    $usersPermissionsUser: ID!
    $firstname: String!
    $lastname: String!
    $cardNumber: String!
    $expirationMonth: Int!
    $expirationYear: Int!
    $cvv: Int!
    $zip: String!
    $type: String!
  ) {
    createCard(
      input: {
        data: {
          users_permissions_user: $usersPermissionsUser
          firstname: $firstname
          lastname: $lastname
          cardNumber: $cardNumber
          expirationMonth: $expirationMonth
          expirationYear: $expirationYear
          cvv: $cvv
          zip: $zip
          type: $type
        }
      }
    ) {
      card {
        id
        users_permissions_user {
          id
          name
        }
      }
    }
  }
`;

export const PAYMENT_DELETE_CARD = gql`
  mutation deleteCard($id: ID!) {
    deleteCard(input: { where: { id: $id } }) {
      card {
        id
      }
    }
  }
`;
