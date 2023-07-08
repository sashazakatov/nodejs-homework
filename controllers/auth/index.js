const registUser = require('./registUser');
const login = require('./login');

const { decorator } = require('../../helpers');

module.exports = {
    registUser: decorator(registUser),
    login: decorator(login),
}