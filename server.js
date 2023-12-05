const express = require("express");
const connectDB = require("./config/db.connect");
const dbConfig = require("./config/db.config.js");
const app = express();
const swaggerUi = require("swagger-ui-express"); // move to index?
const swaggerDocument = require("./swagger.json"); // move to index?

app
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // move to index?
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"));

// connect to the DB
connectDB();

const port = dbConfig.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
