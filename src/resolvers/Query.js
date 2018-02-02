const readFile = require("../lib/read-file");
const readDirectory = require("../lib/read-directory");
const processMarkdown = require("../lib/process-markdown");

const echo = (parent, args, context, info) => {
    const { msg } = args;
    return `${msg}`;
};

const posts = (parent, args, context, info) =>
    readDirectory("content")
        .then(files => files.filter(file => file.includes(".md")))
        .then(markdownFiles =>
            Promise.all(
                markdownFiles.map(file =>
                    readFile(`content/${file}`).then(rawContent =>
                        processMarkdown(rawContent).then(
                            processedContent => processedContent
                        )
                    )
                )
            ).then(posts =>
                posts.map(post => ({
                    id: post.frontmatter.path,
                    title: post.frontmatter.title,
                    content: post.content
                }))
            )
        );

const post = (parent, args, context, info) =>
    readFile(`content/${args.id}.md`).then(content =>
        processMarkdown(content).then(markdownContent => ({
            id: markdownContent.frontmatter.path,
            title: markdownContent.frontmatter.title,
            content: markdownContent.content
        }))
    );

module.exports = {
    echo,
    posts,
    post
};
