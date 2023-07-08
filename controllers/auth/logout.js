const { User } = require('../../models');
const { HttpError } = require('../../helpers')

const logout = async(req, res, next) => {
    const user = await User.findById(req.user.id);

    if(!user){
        throw HttpError({ status: 401, message: "Not authorized" });
    }

    await User.findByIdAndUpdate( user.id, { token: null } );

    res.status(204).json();
}
module.exports = logout;