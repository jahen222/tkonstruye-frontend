import gql from "graphql-tag";

export const SIDEBAR_GET_ME = gql`
  query me {
    me {
      detail {
        id
        username
        slogan
        photo {
          id
          url
        }
        role {
          id
          name
        }
      }
    }
  }
`;

export const PROFILE_GET_ME = gql`
  query me {
    me {
      detail {
        id
        name
        username
        email
        phone
        slogan
        rut
        giro
        contact
        photo {
          id
          url
        }
        commune {
          id
        }
        role {
          id
          name
        }
      }
    }
  }
`;

export const PROFILE_GET_COMMUNES = gql`
  query communes {
    communes {
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
`;

export const TICKETS_GET_TICKETS = gql`
  query tickets($user: ID!, $contains: String) {
    tickets(
      sort: "created_at:desc"
      where: {
        users_permissions_user: $user
        _or: [
          { id_contains: $contains }
          { status_contains: $contains }
          { commune: { name_contains: $contains } }
          { subcategory: { name_contains: $contains } }
          { subcategory: { category: { name_contains: $contains } } }
        ]
      }
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
        name
      }
      commune {
        id
        name
      }
      requirements
      description
      status
    }
  }
`;

export const TICKETS_GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export const TICKETS_GET_SUBCATEGORIES = gql`
  query subCategories($category: ID!) {
    subcategories(where: { category: $category }) {
      id
      name
    }
  }
`;

export const TICKETS_GET_WIZARDFIELDS = gql`
  query wizardFields($subCategory: ID!) {
    wizardFields(where: { subcategories: $subCategory }) {
      id
      label
      type
      isRequired
      isTextLength
      isNumberMin
      isNumberMax
      isSelect
      isRadio
      isCheckbox
    }
  }
`;

export const TICKETS_GET_COMMUNES = gql`
  query communes {
    communes {
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
`;

export const CATEGORIES_GET_CATEGORIES = gql`
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

export const CATEGORIES_GET_ME = gql`
  query me {
    me {
      detail {
        id
        subcategories {
          id
        }
      }
    }
  }
`;

export const PROPOSALS_GET_PROPOSALS = gql`
  query proposals($user: ID!, $contains: String) {
    proposals(
      sort: "created_at:desc"
      where: {
        ticket: { users_permissions_user: $user }
        _or: [
          { id_contains: $contains }
          { users_permissions_user: { username_contains: $contains } }
          { ticket: { id_contains: $contains } }
        ]
      }
    ) {
      id
      users_permissions_user {
        id
        username
        email
        phone
      }
      ticket {
        id
        users_permissions_user {
          id
        }
      }
      coverLetter
      jobDetail
    }
  }
`;

export const PROPOSALS_GET_PROFESSIONAL_PROPOSALS = gql`
  query proposals($user: ID!, $contains: String) {
    proposals(
      sort: "created_at:desc"
      where: {
        users_permissions_user: $user
        _or: [
          { id_contains: $contains }
          {
            ticket: { users_permissions_user: { username_contains: $contains } }
          }
          { ticket: { id_contains: $contains } }
        ]
      }
    ) {
      id
      users_permissions_user {
        id
        username
        email
        phone
      }
      ticket {
        id
        users_permissions_user {
          id
          username
          email
          phone
        }
      }
      coverLetter
      jobDetail
    }
  }
`;

export const PROPOSALS_GET_ME = gql`
  query me {
    me {
      detail {
        id
        role {
          id
          name
        }
      }
    }
  }
`;
