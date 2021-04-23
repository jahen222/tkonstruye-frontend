import gql from "graphql-tag";

export const WIZARD_CREATE_TICKET = gql`
  mutation createTicket(
    $subCategory: ID!
    $usersPermissionsUser: ID!
    $commune: ID!
    $requirements: JSON
  ) {
    createTicket(
      input: {
        data: {
          subcategory: $subCategory
          users_permissions_user: $usersPermissionsUser
          commune: $commune
          requirements: $requirements
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
      }
    }
  }
`;
