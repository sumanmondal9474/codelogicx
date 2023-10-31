const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

module.exports = { auth };