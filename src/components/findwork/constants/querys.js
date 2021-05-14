import gql from "graphql-tag";

export const WIZARD_GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;
