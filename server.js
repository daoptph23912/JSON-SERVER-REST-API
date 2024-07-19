const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const env = require("dotenv");
env.config();
const port = process.env.PORT;
const routes = require("./routes.json");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter(routes);

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
