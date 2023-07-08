const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const current = async(req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user){
        throw HttpError({ status: 401, message: "Not authorized" });
    }

    res.json({
        email: user.email,
        subscription: user.subscription,
    });
}
module.exports = current;