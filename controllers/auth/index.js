const registUser = require('./registUser');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');

const { decorator } = require('../../helpers');

module.exports = {
    registUser: decorator(registUser),
    login: decorator(login),
    logout: decorator(logout),
    current: decorator(current),
}