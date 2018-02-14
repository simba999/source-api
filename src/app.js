const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const {graphqlExpress} = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const Query = require("./resolvers/query");
const readFile = require("./lib/read-file");
const readDirectory = require("./lib/read-directory");
const processMarkdown = require("./lib/process-markdown");
const typeDefs = require("./schema");

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {Query}
});

module.exports = opts => {

    const {graphQlEndpoint = "/graphql", graphQlPlaygroundEndpoint = "/playground"} = opts;

    const app = express();

    app.use(cors());

    app.get("/", (req, res) => res.sendStatus(200));

    app.use(
        graphQlEndpoint,
        bodyParser.json(),
        graphqlExpress(req => ({
            schema,
            context: {
                ...req,
                fs: {
                    readFile,
                    readDirectory
                },
                processMarkdown,
                path
            }
        }))
    );

    if (opts.isDevelopment) {
        const expressPlayground = require("graphql-playground-middleware-express").default;
        app.get(graphQlPlaygroundEndpoint, expressPlayground({endpoint: graphQlEndpoint}));
    }
    return app;
};
