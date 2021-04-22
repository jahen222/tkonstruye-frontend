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
  query subCategories($category: String!) {
    subcategories(where: { category: { name: $category } }) {
      id
      name
    }
  }
`;

export const WIZARD_GET_WIZARDFIELDS = gql`
  query wizardFields($subCategory: String!) {
    wizardFields(where: { subcategories: {name: $subCategory} }) {
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
