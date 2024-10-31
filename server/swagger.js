// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js and Express app',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Adjust this to your server URL and port
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (where your route files are)
};

// Initialize Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
