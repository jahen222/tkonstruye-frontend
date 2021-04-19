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
  query subCategories($categoryId: ID!) {
    subcategories(where: { category: $categoryId }) {
      id
      name
    }
  }
`;

export const WIZARD_GET_WIZARDFIELDS = gql`
  query wizardFields($subCategoryId: ID!) {
    wizardFields(where: { subcategories: $subCategoryId }) {
      id
      label
      type
      isNumberMin
      isNumberMax
      isSelect
      isRadio
      isCheckbox
    }
  }
`;

