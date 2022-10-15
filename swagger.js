const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Home Expercise Program API',
    description: 'This Home Exercise Program API is part of CSE 341 Project 2, Weeks 5-8',
  },
  host: '',
  schemes: ['https','http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);