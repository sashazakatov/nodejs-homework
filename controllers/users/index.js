const registUser = require('./registUser');

const { decorator } = require('../../helpers');

module.exports = {
    registUser: decorator(registUser),
}