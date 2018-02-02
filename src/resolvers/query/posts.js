module.exports = (parent, args, context, info) => {
    const { processMarkdown, fs: {readFile, readDirectory} } = context;
    return readDirectory("content")
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
};
