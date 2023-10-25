const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")

const secretKey = 'suman';
const auth = async (server) => {
    //   await server.register(HapiJwt);

    server.auth.strategy('jwt', 'jwt', {
        key: secretKey,
        validate: async (decoded, request) => {
            // Validate the decoded token and check if the user exists in the database
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            if (!user) {
                return { isValid: false };
            }

            // Attach the user to the request for further use in route handlers
            request.user = user;

            return { isValid: true };
        },
    });

    // Set the default strategy
    server.auth.default('jwt');
};

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

module.exports = { auth, login };