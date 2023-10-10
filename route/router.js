'use strict';

const hapi = require("@hapi/hapi");

const { createUserController, login } = require('../controller/createUser');
const getUserController = require('../controller/getUser');
const updateUserController = require('../controller/updateUser');
const deleteUserController = require('../controller/deleteUser');
const auth= require("../middleware/auth");

const router = [
    {

        method: 'POST',
        path: '/api/post',
        config: { auth: false },
        handler: createUserController
    },
    {
        method: 'POST',
        path: '/login',
        config: { auth: false },
        handler: login,
    },
    {
        method: 'GET',
        path: '/api/user',
        config: { auth: 'jwt' },
        handler: getUserController
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        handler: updateUserController
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: deleteUserController
    }

];


module.exports = {
    name: 'base-route',
    version: '1.0.0',
    register: (server, options) => {
        server.route(router);
    }
}