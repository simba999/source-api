module.exports = (obj, args, context) => {
    const {processMarkdown, fs: {readFile}} = context;
    return readFile(`${args.id}.md`).then(content =>
        processMarkdown(content).then(markdownContent => ({
            id: markdownContent.frontmatter.path,
            title: markdownContent.frontmatter.title,
            content: markdownContent.content
        }))
    );
};
