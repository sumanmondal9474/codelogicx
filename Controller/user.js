"use strict";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")


const createUser = async (request, h) => {
    try {
        const hashedPassword = await bcrypt.hash(request.payload.password, 10);
        request.payload.password = hashedPassword
        const newUser = await prisma.user.create({
            data: request.payload,
        });

        return h.response({ newUser, message: "success" }).code(201);

    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
    }
}

const getUser = async (request, h) => {
    try {
        const params = request.query;
        if ("id" in params) {
            params.id = parseInt(request.query.id);
        }
        // Use Prisma to query the database
        const infos = await prisma.user.findUnique({
            where: params, // Use the query parameters to filter the results
        });

        return h.response({ infos, msg: "Get successfully" }).code(200);
    } catch (error) {
        console.error("Error retrieving data:", error);
        return h.response("Error").code(500);
    } finally {
        await prisma.$disconnect();
    }
};

const getAllUsers = async (request, h) => {
    try {
        const infos = await prisma.user.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return h.response({ infos, msg: "Get All User Successfully" }).code(200);
    } catch (error) {
        console.error("Error retrieving data:", error);
        return h.response("Error").code(500);
    } finally {
        await prisma.$disconnect();
    }
};

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

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
