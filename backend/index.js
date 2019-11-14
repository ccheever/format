let { ApolloServer, gql } = require('apollo-server-express');
let express = require('express');

let resolvers = require('./resolvers');
let typeDefs = require('./typeDefs');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
let server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  formatError: (error) => {
    console.error(error);
    return error;
  },
  formatResponse: (response) => {
    // console.log('Sending response at ' + new Date());
    // console.log(response);
    return response;
  },
  context: ({ req }) => {
    // let clientId = req.get('Princess-Client') || null;
    // let userId = req.get('Princess-User') || null;
    // console.log("Headers", JSON.stringify(req.headers));
    // let user = {
    //   clientId,
    //   userId,
    // };
    // console.log('User: ' + JSON.stringify(user));
    // return { clientId, userId };
    return {};
  },
});
let app = express();

app.get('/', async (req, res) => {
  res.send(`

<html>
  <head>
    <title>📄 Format API</title>
    <style>
      BODY {
        font-family: monospace
      }
    </style>
  </head>
  <body>
  <strong style="color: #333333;">📄 Format API </strong>
  
  <hr style="border: 1px solid #666666;" />
  <a href="/graphql">/graphql</a>
  </body>
</html>
  `);
});

server.applyMiddleware({ app });

let port = process.env.PORT || 6200;

async function mainAsync() {
  // This `listen` method launches a web-server.
  app.listen({ port }, () => {
    console.log(`📄 Format API Server ready at http://localhost:${port}`);
    console.log(`🗂️  GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

if (require.main === module) {
  mainAsync();
}

module.exports = {
  server,
  app,
  port,
  mainAsync,
};
