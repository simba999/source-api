require("dotenv").config();
const App = require("./src/app");

const isDevelopment = "production" !== process.env.NODE_ENV;
const opts = {
    isDevelopment,
    port: process.env.PORT
};
const app = App(opts);

app.listen(opts.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${opts.port}`);
});
