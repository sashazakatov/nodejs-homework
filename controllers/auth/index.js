const registUser = require('./registUser');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatars = require('./updateAvatars');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

const { decorator } = require('../../helpers');

module.exports = {
    registUser: decorator(registUser),
    login: decorator(login),
    logout: decorator(logout),
    current: decorator(current),
    updateSubscription: decorator(updateSubscription),
    updateAvatars: decorator(updateAvatars),
    verifyEmail: decorator(verifyEmail),
    resendVerifyEmail: decorator(resendVerifyEmail),
}