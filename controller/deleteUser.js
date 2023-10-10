'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteUser = async (request, h) => {
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
}

module.exports = deleteUser 