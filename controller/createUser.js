'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// const createUser = async (request, h) => {

//     try {

//         const info = request.payload;
//         console.log(info);

//         const createdInfo = await prisma.user.create({
//             data: info,
//         });

//         console.log('New info created:', createdInfo);

//         return h.response({ createdInfo, message: "success" }).code(201);
//     } catch (error) {
//         console.error('Error creating info:', error);
//         return h.response('Error').code(500);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// const createUser = async (request, h) => {
//     try {
//         const hashedPassword = await bcrypt.hash(request.payload.password, 10);
//         request.payload.password = hashedPassword
//         const newUser = await prisma.user.create({
//             data: request.payload,
//         });


//     } catch (error) {
//         console.error(error);
//         return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
//     }
// }

// const login = async (request, h) => {
//     try {
//         const { email, password } = request.payload
//         const user = await prisma.user.findUnique({
//             where: {
//                 email: email,
//             }
//         })
//         if (!user) {
//             return h.response({ status: 'error', message: 'user not available' }).code(404);

//         }
//         const token = jwt.sign({ userId: user.id }, "suman");

//         return h.response({ status: 'successfull', message: 'Token generated successfully', token }).code(200);

//     } catch (error) {
//         console.error(error);
//         return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
//     }
// }

// module.exports = { createUserController: createUser, login }


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

const login = async (request, h) => {
    try {
        const { email, password } = request.payload
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (!user) {
            return h.response({ status: 'error', message: 'user not available' }).code(404);

        }
        const token = jwt.sign({ userId: user.id }, "suman");

        return h.response({ status: 'successfull', message: 'Token generated successfully', token }).code(200);

    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
    }
}

module.exports = { createUserController: createUser, login }
