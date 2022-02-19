/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        item
        description
        price
        salePrice
        stockLevels {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStockLevel = /* GraphQL */ `
  query GetStockLevel($id: ID!) {
    getStockLevel(id: $id) {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
export const listStockLevels = /* GraphQL */ `
  query ListStockLevels(
    $filter: ModelStockLevelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStockLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
