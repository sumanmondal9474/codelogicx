const router=require('./Router/router')

module.exports = {
    name: 'base-route',
    version: '1.0.0',
    register: (server, options) => {
        server.route(router);
    }
}