'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (request, h) => {
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
}

module.exports =  getUser ;