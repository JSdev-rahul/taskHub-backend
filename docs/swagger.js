const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Hub APIs",
    version: "v1",
    description: "My API Description",
  },
  components: {
    securitySchemes: {
      Authorization: {
        // Use 'Authorization' as the security scheme name
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Token to access these API endpoints",
        scheme: "Bearer", // Use 'Bearer' as the scheme for a normal Authorization token
      },
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ["./docs/*.swagger.js"], // Path to the API routes in your Node.js application
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
