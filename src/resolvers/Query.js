const readFile = require('../lib/read-file');
const processMarkdown = require('../lib/process-markdown');

const echo = (parent, args, context, info) => {
    const {msg} = args;
    return `${msg}`;
};

const posts = (parent, args, context, info) => {
    return require('../../test/fixtures/posts.json');
};

const post = async (parent, args, context, info) => {
    const markdownContent = await readFile(`content/${args.id}.md`);
    const processedMarkdown = await processMarkdown(markdownContent);
    return {
        id: processedMarkdown.frontmatter.path,
        title: processedMarkdown.frontmatter.title,
        content: processedMarkdown.content,
    }
};

module.exports = {
    echo,
    posts,
    post
};
