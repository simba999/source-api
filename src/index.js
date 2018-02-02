const {GraphQLServer} = require('graphql-yoga');

const Query = require('./resolvers/Query');
const readFile = require("./lib/read-file");
const readDirectory = require("./lib/read-directory");
const processMarkdown = require("./lib/process-markdown");

const resolvers = {
    Query
};

const isDevelopment = 'production' !== process.env.NODE_ENV;

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        fs: {
            readFile,
            readDirectory
        },
        processMarkdown
    })
});

const options = {
    port: process.env.PORT || 4000,
    playground: isDevelopment ? '/' : false
};

server.start(options , ({port}) => console.log(`Server is running on http://localhost:${port}`));
