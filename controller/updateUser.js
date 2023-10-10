'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateUser = async (request, h) => {
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
}

module.exports = updateUser