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

test("sends correct cors headers in options request to /graphql", () => {
    const app = App({});
    return request(app)
        .options("/")
        .set('Access-Control-Request-Headers', 'content-type')
        .set("Access-Control-Request-Method", "POST")
        .then(res => {
            expect(res.header['access-control-allow-origin']).toBe("*");
            expect(res.header['access-control-allow-headers']).toBe("content-type");
            expect(res.header['access-control-allow-methods']).toBe("GET,HEAD,PUT,PATCH,POST,DELETE");
        });
});

test("should respond to echo query to /graphql", () => {
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
