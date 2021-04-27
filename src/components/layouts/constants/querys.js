import gql from "graphql-tag";

export const HEADER_GET_LOGO = gql`
  query config {
    config {
      email
      address
      phone
      logo {
        url
      }
    }
  }
`;

export const HEADER_GET_ROLES = gql`
  query roles {
    roles {
      id
      name
    }
  }
`;

export const RESPONSIVEHEADER_GET_LOGO = gql`
  query config {
    config {
      logo_mobile {
        url
      }
    }
  }
`;

export const STICKYMENU_GET_LOGO = gql`
  query config {
    config {
      logo {
        url
      }
    }
  }
`;

export const HEADER_GET_PHOTO = gql`
  query me {
    me {
      detail {
        photo {
          url
        }
      }
    }
  }
`;
