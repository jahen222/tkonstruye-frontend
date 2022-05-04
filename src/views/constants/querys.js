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
      where: {
        _or: [
          { description_contains: $contains }
          { commune: { name_contains: $contains } }
          { commune: { city: { name_contains: $contains } } }
          { commune: { city: { region: { name_contains: $contains } } } }
          { subcategory: { name_contains: $contains } }
          { subcategory: { category: { name_contains: $contains } } }
        ]
      }
    ) {
      id
      subcategory {
        id
        name
        price
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
        map
        city {
          id
          name
          region {
            id
            name
          }
        }
      }
      requirements
      description
      created_at
      proposals{
        id
        users_permissions_user{
          id
        }
      }
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
        map
        city {
          id
          name
          region {
            id
            name
          }
        }
      }
      requirements
      description
      created_at
    }
  }
`;

export const FIND_WORK_GET_ME = gql`
  query me {
    me {
      detail {
        id
        role {
          id
          name
        }
        subscription{
          id
          name
          discount
        }
      }
    }
  }
`;

export const CREATE_PROPOSAL_GET_VULGARITIES = gql`
  query config {
    config {
      vulgarity
    }
  }
`;

export const FIND_WORK_GET_COMMUNES = gql`
  query communes {
    communes {
      id
      name
      map
    }
  }
`;

export const FIND_WORK_FILTER_COMMUNES = gql`
  query tickets($limit: Int, $communeId: ID) {
    tickets(
      sort: "created_at:desc"
      limit: $limit
      where: { commune: $communeId }
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
        map
        city {
          id
          name
          region {
            id
            name
          }
        }
      }
      requirements
      description
      created_at
    }
  }
`;

export const SUBSCRIPTIONS_GET_SUBCRIPTIONS = gql`
  query subscriptions {
    subscriptions {
      id
      name
      description
      price
      discount
      icon
    }
  }
`;