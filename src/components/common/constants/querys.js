import gql from "graphql-tag";

export const WIZARD_GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export const WIZARD_GET_SUBCATEGORIES = gql`
  query subCategories($category: ID!) {
    subcategories(where: { category: $category}) {
      id
      name
    }
  }
`;

export const WIZARD_GET_WIZARDFIELDS = gql`
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

export const WIZARD_GET_COMMUNES = gql`
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
