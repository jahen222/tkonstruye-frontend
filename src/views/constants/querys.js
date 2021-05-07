import gql from "graphql-tag";

export const FIND_WORK_GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
      subcategories {
        id
        name
      }
    }
  }
`;

export const FIND_WORK_GET_TICKETS = gql`
  query tickets($limit: Int, $contains: String) {
    tickets(
      sort: "created_at:desc"
      limit: $limit
      where: { description_contains: $contains }
    ) {
      id
      subcategory {
        id
        name
        category {
          name
        }
      }
      users_permissions_user {
        id
        username
      }
      commune {
        id
        name
      }
      requirements
      description
      created_at
    }
  }
`;

export const FIND_WORK_FILTER_SUBCATEGORIES = gql`
  query tickets($limit: Int, $subCategoryId: ID) {
    tickets(
      sort: "created_at:desc"
      limit: $limit
      where: { subcategory: $subCategoryId }
    ) {
      id
      subcategory {
        id
        name
        category {
          name
        }
      }
      users_permissions_user {
        id
        username
      }
      commune {
        id
        name
      }
      requirements
      description
      created_at
    }
  }
`;
