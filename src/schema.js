module.exports = `type Query {
    echo(msg: String!): String
    posts: [Post!]!
    post(id: String!): Post!
}

type Post {
    id: String!
    title: String!
    content: String!
}
`;
