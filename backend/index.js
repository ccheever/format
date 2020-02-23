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

function handleCommandLineKeypresses(urls) {
  let readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  if (typeof process.stdin.setRawMode === 'function') {
    process.stdin.setRawMode(true);
  }
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name == 'c') {
      process.exit();
    }
    let open = require('open');
    switch (key.name) {
      case 'o':
        open(urls.appUrl);
        break;
      case 'g':
        open(urls.graphqlUrl);
        break;
      case 'q':
        process.exit();
        break;
      default:
        // TODO: Print help or something
        break;
    }
  });

  console.log("o - Open API server | g - Open GraphQL console | q - quit");
}

async function mainAsync() {
  // This `listen` method launches a web-server.
  return new Promise((resolve, reject) => {
    app.listen({ port }, () => {
      console.log(`📄 Format API Server ready at http://localhost:${port}`);
      console.log(`🗂️  GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`);

      let localIp = require('local-ip');
      let myIp = localIp();
      let appUrl = `http://localhost:${port}`;
      let appLanUrl = `http://${myIp}:${port}`;
      resolve({
        appUrl,
        appLanUrl,
        graphqlUrl: `${appUrl}${server.graphqlPath}`,
        graphqlLanUrl: `${appLanUrl}${server.graphqlPath}`,
      });
    });
  });
}

if (require.main === module) {
  (async () => {
    let urls = await mainAsync();
    handleCommandLineKeypresses(urls);
  })();
}

module.exports = {
  server,
  app,
  port,
  mainAsync,
};
