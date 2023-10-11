'use strict';

const { createUserController, login } = require('../controller/createUser');
const { getUserController, getAllUserController } = require('../controller/getUser');
const updateUserController = require('../controller/updateUser');
const deleteUserController = require('../controller/deleteUser');

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
        method: 'GET',
        path: '/api/users',
        config: { auth: false },
        handler: getAllUserController
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        config: { auth: 'jwt' },
        handler: updateUserController
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        config: { auth: 'jwt' },
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