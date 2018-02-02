module.exports = (parent, args, context, info) => {
    const { processMarkdown, fs: {readFile} } = context;
    return readFile(`content/${args.id}.md`).then(content =>
        processMarkdown(content).then(markdownContent => ({
            id: markdownContent.frontmatter.path,
            title: markdownContent.frontmatter.title,
            content: markdownContent.content
        }))
    );
};
