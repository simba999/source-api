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

const post = async (parent, args, context, info) => {
    const markdownContent = await readFile(`content/${args.id}.md`);
    const processedMarkdown = await processMarkdown(markdownContent);
    return {
        id: processedMarkdown.frontmatter.path,
        title: processedMarkdown.frontmatter.title,
        content: processedMarkdown.content
    };
};

module.exports = {
    echo,
    posts,
    post
};
