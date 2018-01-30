const {GraphQLServer} = require('graphql-yoga');

const Query = require('./resolvers/Query');

const resolvers = {
    Query
};

const isDevelopment = 'production' !== process.env.NODE_ENV;

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({...req})
});

const options = {
    port: process.env.PORT || 4000,
    playground: isDevelopment ? '/' : false
};

server.start(options , ({port}) => console.log(`Server is running on http://localhost:${port}`));
