const filterUnwantedFiles = files =>
    files
        .filter(file => file.includes(".md"))
        .filter(file => !file.includes("LICENSE.md"))
        .filter(file => !file.includes("README.md"));

module.exports = (parent, args, context) => {
    const {path, processMarkdown, fs: {readFile, readDirectory}} = context;
    const contentPath = path.resolve(
        __dirname,
        "../../../node_modules/sourcier-content"
    );
    return readDirectory(contentPath)
        .then(files => filterUnwantedFiles(files))
        .then(markdownFiles =>
            Promise.all(
                markdownFiles.map(file =>
                    readFile(file).then(rawContent =>
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
