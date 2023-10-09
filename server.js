'use strict';

const hapi = require("@hapi/hapi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const init = async () => {
    const server = hapi.Server({
        host: "localhost",
        port: 8000
    });

    server.route([{
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
    },
    {
        method: 'POST',
        path: '/api/post',
        handler: async (request, h) => {

            try {

                const info = request.payload;
                console.log(info);

                const createdInfo = await prisma.user.create({
                    data: info,
                });

                console.log('New info created:', createdInfo);

                return h.response({ createdInfo, message: "success" }).code(201);
            } catch (error) {
                console.error('Error creating info:', error);
                return h.response('Error').code(500);
            } finally {
                await prisma.$disconnect();
            }
        },
    },
    {
        method: 'GET',
        path: '/api/user',
        handler: async (request, h) => {
            try {
                const params = request.query;

                // Use Prisma to query the database
                const infos = await prisma.user.findUnique({
                    where: params, // Use the query parameters to filter the results
                });

                return h.response({ infos, msg: "Get successfully" }).code(200);
            } catch (error) {
                console.error('Error retrieving data:', error);
                return h.response('Error').code(500);
            } finally {
                await prisma.$disconnect();
            }
        },
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        handler: async (request, h) => {
            try {
                const id = parseInt(request.params.id, 10); // Parse the ID as an integer
                const info = request.payload;

                // Use Prisma to update the record
                const updatedInfo = await prisma.user.update({
                    where: { id }, // Specify the record to update by ID
                    data: info, // Update data
                });

                return h.response({ updatedInfo, msg: "Successfully Updated" }).code(200);
            } catch (error) {
                console.error('Error updating data:', error);
                return h.response('Error').code(500);
            } finally {
                await prisma.$disconnect();
            }
        },
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: async (request, h) => {
            try {
                const id = parseInt(request.params.id, 10); // Parse the ID as an integer

                // Use Prisma to delete the record
                await prisma.user.delete({
                    where: { id }, // Specify the record to delete by ID
                });

                return h.response({ msg: "Successfully Deleted" }).code(200);
            } catch (error) {
                console.error('Error deleting data:', error);
                return h.response({ error: "Internal Srver Error" }).code(500);
            } finally {
                await prisma.$disconnect();
            }
        },
    }
]);


    await server.start();
    console.log(`Server started on ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
