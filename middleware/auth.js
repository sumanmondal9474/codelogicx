const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const jwt = require('jsonwebtoken');
// const server=require("../config/server")
// const HapiJwt = require('hapi-auth-jwt2')
// const secretKey = 'your-secret-key'
// const auth=async()=>{

// await server.register(HapiJwt)

//     server.auth.strategy('jwt', 'jwt', {
//         key: secretKey,
//         validate: async (decoded, request) => {
//           // Validate the decoded token and check if the user exists in the database
//           const user = await prisma.user.findUnique({
//             where: { id: decoded.id },
//           })
//           if (!user) {
//             return { isValid: false };
//           }

//           // Attach the user to the request for further use in route handlers
//           request.user = user;

//           return { isValid: true };
//         },

//       });

// }
// module.exports = {
//     strategy: {
//       name: 'jwt',
//       options: {
//         key: secretKey,
//         auth,
//         verifyOptions: { algorithms: ['HS256'] },
//       },
//     },
//     defaultStrategy: 'jwt',
//   };



// // auth.js



// const HapiJwt = require('hapi-auth-jwt2');

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

module.exports = auth;