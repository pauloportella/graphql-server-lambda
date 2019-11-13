# graphql-server-lambda

Simple serverless apollo server that fetches data from a google sheet.

```graphql
const typeDefs = gql`
  type Stock {
    date: String!
    stock: String!
    price: Float
  }

  type Query {
    openingValues: [Stock]
  }
`;
```
