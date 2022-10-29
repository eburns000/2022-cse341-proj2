const express = require('express');
const connectDB = require('./config/db.connect');
const dbConfig = require('./config/db.config.js');
const app = express();
const swaggerUi = require('swagger-ui-express'); // move to index?
const swaggerDocument = require('./swagger.json'); // move to index?

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // move to index?
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

// connect to the DB
connectDB();

const port = dbConfig.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


