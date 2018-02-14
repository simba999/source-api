const request = require("supertest");
const App = require("./app");

test("should load /", () => {
    const app = App({});
    return request(app)
        .get("/")
        .then(res => {
            expect(res.status).toBe(200);
        });
});

test("should not load /playground in prod", () => {
    const app = App({
        isDevelopment: true
    });
    return request(app)
        .get("/playground")
        .then(res => {
            expect(res.status).toBe(200);
        });
});

test("should load /playground in dev", () => {
    const app = App({
        isDevelopment: false
    });
    return request(app)
        .get("/playground")
        .then(res => {
            expect(res.status).toBe(404);
        });
});

test("should respond to echo query", () => {
    const app = App({});
    return request(app)
        .post("/graphql")
        .send({
            query: `{
            echo(msg: "hello")
          }`
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual({data: {echo: "hello"}});
        });
});
