'use strict';

const hapi = require("@hapi/hapi");
const server = require("./config/server");
const baseRouter = require("./route/router");
const auth = require("./middleware/auth");

const init = async () => {


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
            path: "/users/{soccer?}",
            handler: (request, h) => {

                if (request.params.soccer) {

                    return `<h1>Hello ${request.params.soccer}</h1>`

                } else {
                    return `<h1>Hello Stranger!</h1>`
                }
            }
        },
        {
            method: "GET",
            path: "/admin/{name?}",
            handler: (request, h) => {
                return `<h1>Hello ${request.query.name}</h1>`
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

    // await server.register({
    //     Plugin: auth
    // })

    await server.register(baseRouter);


    await server.start();
    console.log(`Server started on ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
