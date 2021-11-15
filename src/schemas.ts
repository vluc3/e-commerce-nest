import { gql }  from 'apollo-server';

export const schemas = gql`
  type Query {
    category(id: ID!): Category
    categories: [Category!]!

    product(id: ID!): Product
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    deleteCategory(id: ID!): Boolean!

    addProduct(input: AddProductInput!): Product!
    updateProduct(id: ID!, input: AddProductInput!): Product
    deleteProduct(id: ID!): Boolean!

    addReview(input: AddReviewInput!): Review!
    updateReview(id: ID!, input: AddReviewInput!): Review
    deleteReview(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    category: Category
    reviews: [Review!]!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    categoryId: ID
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  input UpdateProductInput {
    name: String!
    description: String!
    categoryId: ID
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  input AddReviewInput {
    date: String!
    title: String!
    productId: ID
    comment: String!
    rating: Int!
  }

  input UpdateReviewInput {
    date: String!
    title: String!
    productId: ID
    comment: String!
    rating: Int!
  }
`;
