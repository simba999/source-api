const post = require("./post");
const processMarkdown = require("../../lib/process-markdown");

const testMarkdownContent = `
---
path: "hello-world"
date: "2018-01-26"
title: "Hello World"
---

Hello world, this is the initial post!`;

let readFile;
let args;
let context;

beforeEach(() => {
    args = {id: "hello-world"};
    readFile = jest.fn();
    readFile.mockImplementation(() => Promise.resolve(testMarkdownContent));
    context = {processMarkdown, fs: {readFile}};
});

test("it calls readFile once", () => {
    post({}, args, context);
    expect(readFile.mock.calls.length).toBe(1);
});

test("it calls readFile with the correct args", () => {
    post({}, args, context);
    expect(readFile.mock.calls[0][0]).toBe("hello-world.md");
});

test("it should return the correct data", () => {
    post({}, args, context).then(data => {
        expect(data.content).toBe(
            "<p>Hello world, this is the initial post!</p>\n"
        );
        expect(data.id).toBe("hello-world");
        expect(data.title).toBe("Hello World");
    });
});
