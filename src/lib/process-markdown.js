const remark = require("remark");
const html = require("remark-html");
const frontmatter = require("remark-frontmatter");
const yamlParser = require("remark-parse-yaml");

processFrontmatter = node => {
    const frontmatter = node.children.filter(child => child.type === "yaml");
    return frontmatter[0].data.parsedValue;
};

module.exports = content => {
    return new Promise((resolve, reject) => {
        const parser = remark()
            .use(html)
            .use(frontmatter, ["yaml"])
            .use(yamlParser);
        const syntaxTree = parser.parse(content);
        parser
            .run(syntaxTree)
            .then(node =>
                resolve({
                    content: parser.stringify(node),
                    frontmatter: processFrontmatter(node)
                })
            )
            .catch(error => reject(error));
    });
};
