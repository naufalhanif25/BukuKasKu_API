const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BukuKasKu API Documentation",
            version: "1.0.0",
            description: "Dokumentasi API website BukuKasKu",
        },
        servers: [
            {
                url: "https://buku-kas-ku-api.vercel.app",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app) => {
    app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
