const echo = require("./echo");

describe("echo", () => {
    test("echos the passed in message", () => {
        const msg = "hello world";
        const result = echo({}, {msg});
        expect(result).toEqual(msg);
    });
});
