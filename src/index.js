const {GraphQLServer} = require("graphql-yoga");
const path = require("path");

const Query = require("./resolvers/query");
const readFile = require("./lib/read-file");
const readDirectory = require("./lib/read-directory");
const processMarkdown = require("./lib/process-markdown");

const resolvers = {
    Query
};

const isDevelopment = "production" !== process.env.NODE_ENV;

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: req => ({
        ...req,
        fs: {
            readFile,
            readDirectory
        },
        processMarkdown,
        path
    })
});

const options = {
    port: process.env.PORT || 4000,
    playground: isDevelopment ? "/playground" : false,
    endpoint: '/graphql',
    subscriptions: '/subscriptions'
};

server.express.get('/', (req, res) => res.sendStatus(200));

server.start(options, ({port}) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${port}`);
});
