/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateStockLevel = /* GraphQL */ `
  subscription OnCreateStockLevel {
    onCreateStockLevel {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStockLevel = /* GraphQL */ `
  subscription OnUpdateStockLevel {
    onUpdateStockLevel {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStockLevel = /* GraphQL */ `
  subscription OnDeleteStockLevel {
    onDeleteStockLevel {
      id
      productId
      size
      stock
      createdAt
      updatedAt
    }
  }
`;
