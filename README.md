# graphql-server-lambda

Serverless apollo server that fetches data from a google sheet.

- Serverless
- Typescript
- Apollo Server
- Github Actions [serverless deploy]

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
