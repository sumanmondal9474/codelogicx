'use strict';

const Joi = require('joi');

const { login } = require('../../Middleware/auth.js');

const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../../Controller/user');

const fileUpload= require("../../Controller/fileUploads.js")

const router = [
    // {

    //     method: 'POST',
    //     path: '/api/post',
    //     // config: { auth: false },
    //     options: {
    //         handler: createUser,
    //         description: "creating user",
    //         tags: ['api'],
    //         auth: false
    //     }
    // },
    {
        method: 'POST',
        path: '/api/post',
        options: {
            handler: createUser,
            description: 'Creating user',
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            handler: login,
            description: "Login",
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/api/user/{id}',
        options: {
            handler: getUser,
            description: "geting a User",
            tags: ['api'],
            auth: 'jwt',
            validate: {
                query: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        options: {
            handler: getAllUsers,
            description: "geting All Users",
            tags: ['api'],
            auth: 'jwt',
        }
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        options: {
            handler: updateUser,
            description: "updating User",
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                }),
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        options: {
            handler: deleteUser,
            description: "deleting User",
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                }),
            }
        }
    },
    {
        path: '/file-upload',
        method: 'post',
        options: {
            payload: {
                output: 'file',
                multipart: true
            },
            auth: false,
            handler: fileUpload,
            description: "File upload",
            notes: 'file-upload',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .description('file')
                })
            },
        }
    }

];


module.exports = router