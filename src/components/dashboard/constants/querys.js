import gql from "graphql-tag";

export const SIDEBAR_GET_ME = gql`
  query me {
    me {
      detail {
        username
        slogan
        photo {
          url
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
          url
        }
        commune {
          id
        }
        role {
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
`;
