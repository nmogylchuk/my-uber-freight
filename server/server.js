const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth.middleware');

const app = express();
const PORT = config.get('port') || 5000;

app.use(log);
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Uber Freight API",
            description: "Uber Freight API",
            contact: {
            name: "Nataliia Mogylchuk"
            },
        }
    },
    apis: [path.resolve(__dirname + '/server.js'),
           path.resolve(__dirname + '/routes/*.js'),
           path.resolve(__dirname + '/models/*.js')]
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/trucks', require('./routes/trucks'));
app.use('/api/loads', require('./routes/loads'));

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    }
    catch(error) {
        console.log('Server error', error);
        process.exit(1);
    }
}

start();