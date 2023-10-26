const hapi = require('@hapi/hapi');
const path = require('path');
const server = hapi.Server({
    host: "localhost",
    port: 8000,
    routes: {
        cors: {
            origin: ['*'], // an array of origins or 'ignore'    
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // an array of strings - 'Access-Control-Allow-Headers'
            exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'], // an array of exposed headers - 'Access-Control-Expose-Headers',
            additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
            maxAge: 60,
            credentials: true // boolean - 'Access-Control-Allow-Credentials'
        },
        files: {
            relativeTo: path.join(__dirname, '../Uploads')
        }
    }
});

module.exports = server