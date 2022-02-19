/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      item
      description
      price
      salePrice
      stockLevels {
        items {
          id
          productId
          size
          stock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      item
      description
      price
      salePrice
      stockLevels {
        items {
          id
          productId
          size
          stock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      item
      description
      price
      salePrice
      stockLevels {
        items {
          id
          productId
          size
          stock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStockLevel = /* GraphQL */ `
  mutation CreateStockLevel(
    $input: CreateStockLevelInput!
    $condition: ModelStockLevelConditionInput
  ) {
    createStockLevel(input: $input, condition: $condition) {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
export const updateStockLevel = /* GraphQL */ `
  mutation UpdateStockLevel(
    $input: UpdateStockLevelInput!
    $condition: ModelStockLevelConditionInput
  ) {
    updateStockLevel(input: $input, condition: $condition) {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
export const deleteStockLevel = /* GraphQL */ `
  mutation DeleteStockLevel(
    $input: DeleteStockLevelInput!
    $condition: ModelStockLevelConditionInput
  ) {
    deleteStockLevel(input: $input, condition: $condition) {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
