'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const server = require("./Config/server");
const baseRouter = require("./Routes/index");
const { auth } = require("./Middleware/auth");
const Pack = require('./package.json');

const init = async () => {
    await server.register(require('@hapi/inert'));

    const swaggerOptions = {
        info:{
            title:'Test API Documentation',
            version:Pack.version,
        },
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [{ jwt: [] }],
        schemes: ['http','https']
    }

    server.route([
        {
            method: "GET",
            path: "/",
            handler: (request, h) => {
                return "<h1>Hello World!</h1>"
            }
        },
        {
            method: "GET",
            path: "/{any*}",
            handler: (request, h) => {
                return `<h1>Oh no! You are lost</h1>`
            }
        }
    ]);

    await server.register(require('hapi-auth-jwt2'));
    

    await auth(server);

    await server.register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions
        }
    ])

    await server.register(baseRouter);

    await server.start();
    console.log(`Server started on ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
