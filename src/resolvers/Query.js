const echo = (parent, args, context, info) => {
    const {msg} = args;
    return `${msg}`;
}

const posts = (parent, args, context, info) => {
    return require('../../test/fixtures/posts.json');

}

module.exports = {
    echo,
    posts
};
